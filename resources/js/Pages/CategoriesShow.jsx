import DataTable from '@/Components/DataTable'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'

export default function CategoriesShow({ auth, books, name }) {
    const rowHeight = 200

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            type: 'number',
            width: 90,
        },
        {
            field: 'cover',
            headerName: 'Cover',
            type: 'string',
            width: 200,
        },
        {
            field: 'judul',
            headerName: 'Judul',
            type: 'string',
            sortable: false,
            width: 300,
        },

        {
            field: 'jumlah',
            headerName: 'Jumlah',
            width: 150,
        },
    ]

    const rows = books.map((book) => ({
        id: book.id,
        uuid: book.uuid,
        cover: book.cover,
        judul: book.judul,
        jumlah: book.jumlah,
    }))

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Daftar Buku {name}
                </h2>
            }
        >
            <Head title="CategoriesShow" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <DataTable
                                columns={columns}
                                rows={rows}
                                rowHeight={rowHeight}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
