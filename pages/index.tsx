import type { NextPage } from 'next';
import Link from 'next/link';
import FloatingButton from '@components/floating-button';
import Icon from '@components/Icon';
import Items from '@components/item';
import Layout from '@components/layout';
import Head from 'next/head';
import useUser from '@libs/client/useUser';

const Home: NextPage = () => {
    const user = useUser();
    console.log(user);
    return (
        <Layout title="홈" hasTabBar>
            <Head>
                <title>Home</title>
            </Head>
            <div className="px-4 flex flex-col space-y-5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, i) => (
                    <Items
                        id={i}
                        productTitle={`${'타이틀'}`}
                        productOption={['옵션1', '옵션2']}
                        price={`${i * 500}`}
                        likeCount={i}
                        commentCount={i}
                    ></Items>
                ))}
                <FloatingButton href="/items/upload" children={<Icon iconName="plus"></Icon>}></FloatingButton>
            </div>
        </Layout>
    );
};

export default Home;
