import jwt from 'jsonwebtoken';
// 返回一个token给前端
export function generate_WIT() {
    return jwt.sign({data: 'payload'}, 'secret');
}