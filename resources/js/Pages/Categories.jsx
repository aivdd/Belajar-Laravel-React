import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import DataTable from "@/Components/DataTable";
import InertiaLink from "@/Components/InertiaLink";
import { useState } from "react";

export default function Categories({ auth, categories }) {
    const [deletingCategory, setDeletingCategory] = useState(null);

    const handleDelete = (uuid) => {
        Inertia.delete(route("category.destroy", { uuid }));
        console.log(`Deleting category with UUID: ${uuid}`);
        setDeletingCategory(null);
    };

    const columns = [
        {
            field: "id",
            headerName: "ID",
            type: "number",
            width: 90,
        },
        {
            field: "name",
            headerName: "Nama Kategori",
            type: "string",
            width: 400,
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 250,
            cellClassName: "actions",
            getActions: ({ row }) => [
                <InertiaLink
                    href={route("categories.show", { uuid: row.uuid })}
                    className="underline text-sm text-blue-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    daftar buku
                </InertiaLink>,
                <InertiaLink
                    href={route("categories.edit", { uuid: row.uuid })}
                    className="underline text-sm text-blue-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    edit
                </InertiaLink>,
                <button
                    key="delete"
                    onClick={() => setDeletingCategory(row)}
                    className="underline text-sm text-blue-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    hapus
                </button>,
            ],
            autoWidth: true,
        },
    ];
    const rows = categories.map((category) => ({
        id: category.id,
        uuid: category.uuid,
        name: category.name,
    }));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Categories
                </h2>
            }
        >
            <Head title="Categories" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Link
                                href={route("categories.create")}
                                className="ml-4 mb-4 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Tambah{" "}
                            </Link>
                            <DataTable columns={columns} rows={rows} />
                            {deletingCategory && (
                                <div className="fixed z-10 inset-0 overflow-y-auto">
                                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                        <div className="fixed inset-0 transition-opacity">
                                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                        </div>
                                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                                        &#8203;
                                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                <div className="sm:flex sm:items-start">
                                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                        <svg
                                                            className="h-6 w-6 text-red-600"
                                                            stroke="currentColor"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M6 18L18 6M6 6l12 12"
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                                            Hapus Category
                                                        </h3>
                                                        <div className="mt-2">
                                                            <p className="text-sm text-gray-500">
                                                                Apakah Anda
                                                                yakin ingin
                                                                menghapus
                                                                Category ini?
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            deletingCategory.uuid,
                                                        )
                                                    }
                                                    type="button"
                                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                >
                                                    Hapus
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setDeletingCategory(
                                                            null,
                                                        )
                                                    }
                                                    type="button"
                                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                                >
                                                    Batal
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
