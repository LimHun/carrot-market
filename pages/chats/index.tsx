import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout";

const Chats: NextPage = () => {
    return (
        <Layout title="채팅" hasTabBar>
            <div className="py-0 divide-y-[1px]">
                {[1,1,1,1,1,1,1,1,1,1,1,1,1].map((value,i) => (
                    <Link href={`/chats/${i}`}>
                        <a className="cursor-pointer">  
                            <div
                                key={i}
                                className="flex px-4 cursor-pointer py-3 items-center space-x-3"
                            >
                                <div className="w-12 h-12 rounded-full bg-slate-300"/>
                                <div>
                                    <p className="text-gray-700">Steve Jebs</p>
                                    <p className="text-sm text-gray-500">
                                        {value}:{i}See you tomorrow in the corner at 2pm!    
                                    </p>
                                </div>
                            </div>
                        </a>
                    </Link>
                ))}
            </div>
        </Layout>
    )
}

export default Chats