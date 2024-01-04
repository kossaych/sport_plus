/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

const nextConfig = {
    ...withPWA({
          dest: 'public', 
          register: true, 
          skipWaiter: true, 
      })
}


module.exports = nextConfig
