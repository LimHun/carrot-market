import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout";

const Live: NextPage = () => {
    return (
        <Layout title="라이브" hasTabBar>
            <div className="py-0 divide-y-2 space-y-4">
                {[1,1,1,1,1,1].map((_,i) => (
                    <Link href={`/streams/${i}`}>
                        <a className="cursor-pointer">
                            <div className="pt-4 px-4 mb-4" key={i}>
                                <div className="w-full rounded-md bg-slate-300 aspect-video"/>
                                <h3 className="font-medium text-gray-700 text-lg mt-2">
                                    Let&apos;s try potaos
                                </h3>
                            </div>
                        </a>
                    </Link>
                ))}     
                <button className="hover:bg-orange-500 cursor-pointer transition-colors fixed bottom-28 right-5 bg-orange-400 rounded-full border-transparent text-white p-4 shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2"
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </button>
            </div>
        </Layout>
    )
}

export default Live