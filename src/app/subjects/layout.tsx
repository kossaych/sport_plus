
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from "@/components/Home components/footer";
 import Lives from "@/components/Home components/lives";
import Offer from "@/components/Home components/offer";
import Subjects from "@/components/Home components/subjects";
import Subject from '@/components/Home components/subjects';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'subjects',
  description: '',
  manifest: '/manifest.json',
  icons:{apple : '/icon.pnj',},
  themeColor : "#fff"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}<Subject/></>
  )
}



