import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";

export default function BookEdit({ auth, categories, book }) {
    const { data, setData, patch, progress, errors, processing } = useForm({
        judul: book?.judul,
        deskripsi: book?.deskripsi,
        jumlah: book?.jumlah,
        category_id: book?.category_id,
        cover: null,
        files: null,
    });

    const editBuku = (e) => {
        e.preventDefault();
        patch(route("book.update", book?.uuid));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Buku
                </h2>
            }
        >
            <Head title="Edit Buku" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form
                                onSubmit={editBuku}
                                className="space-y-6"
                                encType="multipart/form-data"
                            >
                                <div>
                                    <InputLabel
                                        htmlFor="judul"
                                        value="Judul  Buku"
                                    />
                                    <TextInput
                                        id="judul"
                                        value={data.judul}
                                        onChange={(e) =>
                                            setData("judul", e.target.value)
                                        }
                                        type="text"
                                        className="mt-1 block w-full"
                                    />
                                    <InputError
                                        message={errors.judul}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="deskripsi"
                                        value="Deskripsi"
                                    />
                                    <TextInput
                                        id="deskripsi"
                                        value={data.deskripsi}
                                        onChange={(e) =>
                                            setData("deskripsi", e.target.value)
                                        }
                                        type="text"
                                        className="mt-1 block w-full"
                                    />
                                    <InputError
                                        message={errors.deskripsi}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="jumlah"
                                        value="Jumlah"
                                    />
                                    <TextInput
                                        id="jumlah"
                                        value={data.jumlah}
                                        onChange={(e) =>
                                            setData("jumlah", e.target.value)
                                        }
                                        type="number"
                                        className="mt-1 block w-full"
                                    />
                                    <InputError
                                        message={errors.jumlah}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="category_id"
                                        value="Kategori"
                                    />
                                    <select
                                        id="category_id"
                                        name="category_id"
                                        value={data.category_id}
                                        onChange={(e) =>
                                            setData(
                                                "category_id",
                                                e.target.value,
                                            )
                                        }
                                    >
                                        <option>Select a category</option>
                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.category_id}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="cover"
                                        value="Cover (JPEG/JPG/PNG)"
                                    />
                                    <input
                                        type="file"
                                        id="cover"
                                        name="cover"
                                        //value={data.cover}
                                        accept="image/jpeg, image/jpg, image/png"
                                        onChange={(e) =>
                                            setData("cover", e.target.files[0])
                                        }
                                    />
                                    {progress && (
                                        <progress
                                            value={progress.percentage}
                                            max="100"
                                        >
                                            {progress.percentage}%
                                        </progress>
                                    )}
                                    <InputError
                                        message={errors.cover}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="files"
                                        value="File (pdf)"
                                    />
                                    <input
                                        type="file"
                                        id="files"
                                        name="files"
                                        //value={data.files}
                                        accept="application/pdf"
                                        onChange={(e) =>
                                            setData("files", e.target.files[0])
                                        }
                                    />
                                    {progress && (
                                        <progress
                                            value={progress.percentage}
                                            max="100"
                                        >
                                            {progress.percentage}%
                                        </progress>
                                    )}
                                    <InputError
                                        message={errors.files}
                                        className="mt-2"
                                    />
                                </div>
                                <PrimaryButton disabled={processing}>
                                    Save
                                </PrimaryButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
