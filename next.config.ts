import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.2.254', 'localhost', '127.0.0.1'],
  // 如果你使用了其他配置，请保留，只需添加上面这一行
};

export default nextConfig;