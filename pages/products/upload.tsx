import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { Product } from "@prisma/client";
import { useRouter } from "next/router";

interface UploadProductForm {
    name: string;
    price: number;
    description: string;
}

interface UploadProductMutation {
    ok: boolean;
    product: Product;
}

const Upload: NextPage = () => {
    // 다른 페이지로 라우팅하기 위한 변수
    const router = useRouter();
    // react-hook-form 을이용한 데이터 전달 및 함수 호출
    // onValid 함수를 handleSubmit 통해 호출 이라고하면 알아 듣기 힘들고
    // form에서 submit 하면 handleSubmit 이 가리키고 있는 onValid 함수 호출
    const { register, handleSubmit } = useForm<UploadProductForm>();

    // uploadProduct로 /api/products 호출 (data) 전달
    // 여기서 data는 form을 통해 입력 받은 데이터임 UploadProductForm 형태
    const [uploadProduct, { loading, data }] = useMutation<UploadProductMutation>("/api/products");
    const onValid = (data: UploadProductForm) => {
        console.log(data);
        if (loading) return;
        uploadProduct(data);
    };
    useEffect(() => {
        if (data?.ok) {
            // 여기 data는
            // page/api/products/index.ts 파일에 있는
            // POST방식의 res.json({ok: true, product});이다.
            router.push(`/products/${data.product.id}`);
        }
    }, [data, router]);
    return (
        <Layout canGoBack title="Upload Product">
            <form className="p-4 space-y-4" onSubmit={handleSubmit(onValid)}>
                <div>
                    <label className="w-full cursor-pointer text-gray-600 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
                        <svg
                            className="h-12 w-12"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <input className="hidden" type="file" />
                    </label>
                </div>
                <Input register={register("name", { required: true })} required label="Name" name="name" type="text" />
                <Input
                    register={register("price", { required: true })}
                    required
                    label="Price"
                    name="price"
                    type="text"
                    kind="price"
                />
                <TextArea
                    register={register("description", { required: true })}
                    name="description"
                    label="Description"
                    required
                />
                <Button text={loading ? "Loading..." : "Upload item"} />
            </form>
        </Layout>
    );
};

export default Upload;
