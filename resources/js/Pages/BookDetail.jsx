import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function BookDetail({
    auth,
    judul,
    category,
    category_uuid,
    deskripsi,
    jumlah,
    files,
    cover,
}) {
    const downloadPdf = () => {
        const BASE_URL = "http://127.0.0.1:8000";
        const pdfUrl = `${BASE_URL}/storage/${files}`;

        window.open(pdfUrl, "_blank");
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail Buku
                </h2>
            }
        >
            <Head title="Detail Buku" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <img
                                src={"/storage/" + cover}
                                alt={"Image " + judul}
                                style={{
                                    width: "20%",
                                    height: "20%",
                                    objectFit: "cover",
                                    padding: "32px",
                                }}
                            />
                            <h1 className="text-lg font-bold text-gray-900">
                                {judul}
                            </h1>
                            <p>
                                Kategori:{" "}
                                <Link
                                    href={route(
                                        "categories.show",
                                        category_uuid,
                                    )}
                                    className="underline text-sm text-blue-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    {category}
                                </Link>
                                , jumlah : {jumlah}
                            </p>

                            <h2 className="text-lg font-medium text-gray-900">
                                Deskripsi
                            </h2>
                            {deskripsi}
                            <h2 className="text-lg font-medium text-gray-900">
                                Download
                            </h2>
                            <h2 className="underline text-sm text-blue-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <a href="#" onClick={downloadPdf}>
                                    [PDF]
                                </a>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
