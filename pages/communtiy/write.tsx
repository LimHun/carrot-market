import type { NextPage } from "next";
import Layout from "@components/layout";
import useMutation from "@libs/client/useMutation";
import { Post } from "@prisma/client";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import TextArea from "@components/textarea";
import { useEffect } from "react";
import useCoords from "@libs/client/useCoords";

interface PostWrite {
    question: string;
}

interface PostResponse {
    ok: boolean;
    post: Post;
}

const Write: NextPage = () => {
    // 위치 정보 가져오기
    const { latitude, longitude } = useCoords();
    const [post, { loading, data }] = useMutation<PostResponse>("/api/posts");
    const router = useRouter();

    const { register, handleSubmit } = useForm<PostWrite>();
    const onVelid = (data: PostWrite) => {
        if (loading) return;
        post({ ...data, latitude, longitude });
    };

    useEffect(() => {
        if (data && data.ok) {
            router.replace(`/communtiy/${data.post.id}`);
        }
    });

    return (
        <Layout title="동네 질문하기" canGoBack>
            <form onSubmit={handleSubmit(onVelid)} className="px-4 py-10">
                <TextArea
                    register={register("question", { required: true, minLength: 5 })}
                    required
                    placeholder="Ask a question!"
                />
                <button className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none ">
                    Submit
                </button>
            </form>
        </Layout>
    );
};

export default Write;
