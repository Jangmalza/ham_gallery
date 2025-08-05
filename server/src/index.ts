import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import multer from 'multer';
import os from 'os';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// 업로드된 파일을 저장할 디렉토리
const UPLOADS_DIR = path.resolve(__dirname, '../public/uploads');

// 임시 파일 저장을 위한 multer 설정
const upload = multer({
  dest: os.tmpdir(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB 제한
  },
});

app.use(cors());
app.use(express.json());

// 정적 파일 제공
app.use('/uploads', express.static(UPLOADS_DIR));

const DB_PATH = path.resolve(__dirname, '../data/db.json');

// 데이터베이스 파일을 읽고 쓰는 함수
const readDB = async () => {
  try {
    const dbData = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(dbData);
  } catch (error) {
    return { photos: [] };
  }
};

const writeDB = async (data: any) => {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
};

// 사진 목록 가져오기 API
app.get('/api/photos', async (req, res) => {
  try {
    const db = await readDB();
    res.json(db.photos);
  } catch (error) {
    res.status(500).json({ message: 'Error reading database' });
  }
});

// 사진 업로드 API
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const { title, description, tags, photographer, location } = req.body;
  const file = req.file;

  try {
    // 저장할 파일 이름 생성
    const fileName = `${Date.now().toString()}_${file.originalname}`;
    const newPath = path.join(UPLOADS_DIR, fileName);

    // 임시 파일을 uploads 디렉토리로 이동
    await fs.rename(file.path, newPath);

    // 클라이언트에게 제공할 파일 URL
    const fileUrl = `http://localhost:${PORT}/uploads/${fileName}`;

    const newPhoto = {
      id: Date.now().toString(),
      url: fileUrl,
      title: title || 'Untitled',
      description: description || '',
      tags: tags ? tags.split(',').map((tag: string) => tag.trim()) : [],
      width: 0, // 실제 이미지 너비/높이는 필요 시 라이브러리를 통해 추출
      height: 0,
      photographer: photographer || 'Unknown',
      location: location || 'Unknown',
    };

    const db = await readDB();
    db.photos.push(newPhoto);
    await writeDB(db);
    res.status(201).json(newPhoto);
  } catch (error) {
    console.error('Upload error:', error);
    // 실패 시 임시 파일 삭제
    if (file && file.path) {
      await fs.unlink(file.path).catch(err => console.error("Failed to delete temp file", err));
    }
    res.status(500).json({ message: 'Error uploading file' });
  }
});

// 로그인 API
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    res.status(200).json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
