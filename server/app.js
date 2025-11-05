const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const db = require('./db');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// === 配置 multer 图片上传 ===
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        const dir = 'server/uploads';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        cb(null, dir);
    },
    filename: (_, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// === 后台新增接口 ===
app.post('/admin/add', upload.array('pics'), (req, res) => {
    const { name, price, stock } = req.body;
    if (!name || price == null || stock == null) return res.status(400).send('缺参数');

    const pics = req.files.map(f => 'server/uploads/' + f.filename); // 存相对路径
    const sql = 'INSERT INTO product(name,price,stock,pics) VALUES (?,?,?,?)';
    db.run(sql, [name, price, stock, JSON.stringify(pics)], function (err) {
        if (err) return res.status(500).send(err.message);

        // 写入成功后→重新生成 data.js
        regenerateDataJs();
        res.json({ id: this.lastID, msg: '新增成功' });
    });
});

// === 读取全表→重写 data.js ===
const { execSync } = require('child_process');

function regenerateDataJs() {
    /* 1. 生成最新 data.js 内容（略） */
    const code = `const raw = ${JSON.stringify(newData, null, 2)};\n`;
    fs.writeFileSync('web/data.js', code, 'utf8');

    /* 2. 一键提交并推送 */
    try {
        execSync('git add web/data.js');
        execSync('git commit -m "chore: update product data from admin"');
        execSync('git push origin main');   // 推到 GitHub
        console.log('[Git] 已推送到远程');
    } catch (e) {
        console.error('[Git] 提交失败', e.message);
    }
}

// === 启动 ===
app.listen(3001, () => console.log('✅ 后台接口 http://localhost:3001/admin/add'))