import type { NextPage } from "next";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { Answer, Post, User } from "@prisma/client";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import { cls } from "@libs/client/utils";
import { useEffect } from "react";

interface AnswerWithUser extends Answer {
    user: User;
}

interface PostWithUser extends Post {
    user: User;
    _count: {
        answers: number;
        wondering: number;
    };
    answers: AnswerWithUser[];
}

interface CommuntiyPostResponse {
    ok: boolean;
    post: PostWithUser;
    isWondering: boolean; // 유저의 동의 여부 확인 변수
}

interface AnswerForm {
    answer: string;
}

interface AnswerResponse {
    ok: boolean;
    response: Answer;
}

const CommunityPostDetail: NextPage = () => {
    const router = useRouter();
    const { data, mutate } = useSWR<CommuntiyPostResponse>(router.query.id ? `/api/posts/${router.query.id}` : null);
    console.log(data); // 이 로그는 크롬 검사 를 통해 확인한다. 위처럼 쓰면 나오질 않는다.

    const [wonder, { loading }] = useMutation(`/api/posts/${router.query.id}/wonder`);
    const [sendAnswer, { data: answerData, loading: answerLoading }] = useMutation<AnswerResponse>(
        `/api/posts/${router.query.id}/answers`,
    );
    const onWonderClick = () => {
        if (!data) return;
        mutate(
            {
                ...data,
                post: {
                    ...data.post,
                    _count: {
                        ...data.post._count,
                        wondering: data.isWondering ? data.post._count.wondering - 1 : data.post._count.wondering + 1,
                    },
                },
                isWondering: !data.isWondering,
            },
            false,
        );
        if (!loading) return;
        wonder({});
    };

    // reset은 form을 처음으로 초기화 할수있는 함수다.
    const { register, handleSubmit, reset } = useForm<AnswerForm>();
    const onVelid = (form: AnswerForm) => {
        if (answerLoading) return;
        sendAnswer(form);
    };
    useEffect(() => {
        // answerDatat가 갱신이 되면 form 을 초기화 한다.
        if (answerData && answerData.ok) {
            reset();
            mutate();
        }
    }, [answerData, reset, mutate]);

    return (
        <Layout title="동네질문 상세보기" canGoBack>
            <div>
                <span className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-medium bg-gray-100 text-gray-800">
                    동네질문
                </span>
                <div className="flex mb-3 px-4 cursor-pointer pb-3 border-b items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-slate-300" />
                    <div>
                        <p className="text-sm font-medium text-gray-700">{data?.post?.user?.name}</p>
                        <Link href={`/users/profiles/${data?.post?.user?.id}`}>
                            <a className="text-xs font-medium text-gray-500">View profile &rarr;</a>
                        </Link>
                    </div>
                </div>
                <div>
                    <div className="mt-2 px-4 text-gray-700">
                        <span className="text-orange-500 font-medium">Q.</span> {data?.post?.question}
                    </div>
                    <div className="flex px4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px] w-full">
                        <button
                            onClick={onWonderClick}
                            className={cls(
                                "flex space-x-2 items-center text-sm ml-4",
                                data?.isWondering ? "text-teal-600" : "",
                            )}
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                            <span>궁금해요 {data?.post._count.wondering}</span>
                        </button>
                        <span className="flex space-x-2 items-center text-sm">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                ></path>
                            </svg>
                            <span>답변 {data?.post?._count?.answers}</span>
                        </span>
                    </div>
                    <div className="px-4 my-5 space-y-5">
                        {data?.post?.answers?.map((answer) => (
                            <div key={answer.id} className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-slate-200 rounded-full" />
                                <div>
                                    <span className="text-sm block font-medium text-gray-700">{answer.user.name}</span>
                                    <span className="text-xs text-gray-500 block ">{answer.createdAt}</span>
                                    <p className="text-gray-700 mt-2">{answer.answer} </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <form onSubmit={handleSubmit(onVelid)} className="px-4">
                    <TextArea
                        register={register("answer", { required: true, minLength: 5 })}
                        name="description"
                        placeholder="Answer this question!"
                        required
                    />
                    <button className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
                        {answerLoading ? "Loading..." : "Reply"}
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default CommunityPostDetail;
