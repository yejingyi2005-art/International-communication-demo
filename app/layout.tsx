import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'信使之国｜跨时空传播议事厅',description:'10分钟翻转课堂：三份寓言卷宗、理论地图、学术圆桌与生成式把关。预设教学模拟，离线可用。'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>}
