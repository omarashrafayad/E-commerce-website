import mongoose from 'mongoose';

// 1. استخدام متغير global لمنع تكرار الاتصال في كل Request
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

const DBconnection = async () => {
  // 2. إذا كان هناك اتصال قائم بالفعل، لا تفعل شيئاً
  if (cached.conn) {
    return cached.conn;
  }

  // 3. إعدادات الاتصال لتحسين الأداء في الـ Serverless
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // يمنع Mongoose من الانتظار إذا انقطع الاتصال
      serverSelectionTimeoutMS: 5000, // يفشل بسرعة بدلاً من التعليق لـ 30 ثانية
    };

    cached.promise = mongoose.connect(process.env.DATABASE!, opts).then((mongoose) => {
      console.log(`Database Connected: ${mongoose.connection.host}`);
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.log(`failed to connect to database: ${e}`);
    throw e;
  }

  return cached.conn;
};

export default DBconnection;