import {fileURLToPath} from 'url';
import {dirname} from 'path';
// 获取当前目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import path from 'path';
import fs from 'fs/promises';
//所有图片的列表
const images = async (req, res) => {
  try {
    const uploadDir = path.join('uploads');
    const files = await fs.readdir(uploadDir);
    const images = await Promise.all(
        files.map(async file => {
          const stats = await fs.stat(path.join(uploadDir, file));
          return {
            filename: file,
            originalname: file.split('-').slice(2).join('-'),
            uploadedAt: stats.birthtime
          };
        })
    );
    let url = [];
    images.forEach(x => url.push(x.filename))
    res.json(url);
  } catch (error) {
    res.status(500).json([]);
  }
}
//上传图片
const useupload = async (req, res) => {
  console.log(req.files)
  try {
    const urls = req.files.map(file => ({
      filename: file.filename,
      url: file.filename
    }));
    res.json({
      success: true, data: urls, code: 200,
    });
  } catch (error) {
    res.status(400).json({
      message: '文件上传失败'
    });
  }
}
//删除图片
const imagesDelete = async (req, res) => {
  const {filename}  = req.body.params
  console.log(filename)
  const filePath = path.join('uploads', filename);
  try {
    await fs.unlink(filePath);
    res.json({success: true,code:200});
  } catch (e) {
    const status = e.code === 'ENOENT' ? 404 : 500;
    res.status(status).json({success: false, message: '删除失败'});
  }
}

export function uploading() {
  return {
    images,
    useupload,
    imagesDelete
  }
}