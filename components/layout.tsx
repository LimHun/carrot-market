import Link from "next/link"
import React from "react"
import { cls } from "@libs/client/utils"
import { useRouter } from "next/router";
import Icon from '@components/Icon';

interface LayoutProps {
    title? : string
    canGoBack?:boolean
    hasTabBar?: boolean
    children: React.ReactNode
}

export default function Layout({title, canGoBack, hasTabBar, children}:LayoutProps) {

    class TabData {
        address : string
        tabName : string
        iconName : string
        constructor(address: string, tabName: string, iconName: string) {
            this.address = address
            this.tabName = tabName
            this.iconName = iconName
        }
    }

    const tabDataArray : TabData[] = [new TabData("/", "홈", "home"),
                                        new TabData("/communtiy", "동내생활", "communtiy"),
                                        new TabData("/chats", "채팅", "chats"),
                                        new TabData("/streams", "라이브", "streams"),
                                        new TabData("/profile", "나의 당근", "profile")]

    const router = useRouter();
    const onClick = () => {
        router.back();
    };
    return (
        <div>
            <div className="max-w-xl bg-white w-full text-lg font-medium py-3 fixed text-gray-700 border-b px-10 top-0 flex justify-center">
                {<span>{title}</span>}
                {canGoBack ? 
                    <button className="absolute left-3" onClick={onClick}>
                        <Icon iconName="chevron-left"></Icon>
                    </button> : null}
            </div>
            <div className={cls("pt-16", hasTabBar ? "pb-24" : "")}>{children}</div>
            {hasTabBar ? (
                <nav className="bg-white max-w-xl text-gray-700 border-t fixed bottom-0 w-full px-10 pb-10 pt-3 flex justify-between items-center text-xs">
                    {[1, 1, 1, 1, 1].map((_, i) => (
                        <Link href={tabDataArray[i].address}>
                            <a className={cls("flex flex-col items-center space-y-2", router.pathname === `${tabDataArray[i].address}` ? "text-orange-500" : "hover:text-gray-500 transition-colors")}>
                                <Icon iconName={tabDataArray[i].iconName}>
                                </Icon>   
                            <span>{tabDataArray[i].tabName}</span>
                            </a>
                        </Link>
                    ))}
                </nav>
            ) : null}
        </div>
    )
}