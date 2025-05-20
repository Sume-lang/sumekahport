import { put, del } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const formData = await request.formData();
        const files = formData.getAll('files') as File[];
        const folder = formData.get('folder') as string | null;

        if (!files || files.length === 0) {
            return NextResponse.json(
                { error: 'No files provided' },
                { status: 400 }
            );
        }

        const uploadResults = await Promise.all(
            files.map(async (file) => {
                const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
                if (!allowedMimeTypes.includes(file.type)) {
                    throw new Error(`Invalid file type: ${file.name}`);
                }

                return await put(
                    `${folder ? `${folder}/` : ''}${Date.now()}_${file.name}`,
                    file,
                    { access: 'public', token: process.env.BLOB_READ_WRITE_TOKEN }
                );
            })
        );

        return NextResponse.json(uploadResults);
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Upload failed' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request): Promise<NextResponse> {
    try {
        const { urls } = await request.json();

        if (!urls || !Array.isArray(urls)) {
            return NextResponse.json(
                { error: 'Invalid URLs provided' },
                { status: 400 }
            );
        }

        await Promise.all(urls.map(url => del(url, { token: process.env.BLOB_READ_WRITE_TOKEN })));

        return NextResponse.json({ success: true });
    } catch (error) { {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Deletion failed' },
            { status: 500 }
        );
    }
    }
}