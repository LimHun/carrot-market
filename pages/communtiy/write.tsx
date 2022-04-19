import type { NextPage } from "next";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { Post } from "@prisma/client";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface WriteForm {
    question: string;
}

// 데이터를 받기 위해 만은 인터페이스
interface WriteResponse {
    ok: boolean;
    post: Post;
}

const Write: NextPage = () => {
    const [post, { loading, data }] = useMutation<WriteResponse>("/api/posts"); // 요건 걍 데이터를 불러오는거다.

    const { register, handleSubmit } = useForm<WriteForm>();

    const onValid = (data: WriteForm) => {
        if (loading) return;
        post(data);
        console.log(`data.question : ${data.question}`);
    };

    const router = useRouter();
    useEffect(() => {
        if (data && data.ok) {
            router.push(`/communtiy/${data.post.id}`);
        }
    }, [data, router]);

    return (
        <Layout title="동네 질문하기" canGoBack>
            <form onSubmit={handleSubmit(onValid)} className="px-4 py-10">
                <TextArea
                    register={register("question", { required: true, minLength: 5 })}
                    required
                    placeholder="Ask a question!"
                />
                <textarea
                    className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500 "
                    rows={4}
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
