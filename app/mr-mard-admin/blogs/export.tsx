'use client';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { mkConfig, generateCsv, download } from 'export-to-csv';

const ExportButton = ({ type }: { type: string }) => {
    const [loading, setLoading] = useState(false);

    const handleDownloadAndExport = async () => {
        try {
            setLoading(true);
            if (type === "blog") {
                const blogs = await db.blog.findMany();
                const csvConfig = mkConfig({
                    fieldSeparator: ',',
                    quoteStrings: false,
                    decimalSeparator: '.',
                    showTitle: true,
                    title: 'Blogs Export',
                    useTextFile: false,
                    useBom: true,
                    useKeysAsHeaders: true,
                });

                const formattedBlogs = blogs.map(blog => ({
                    ...blog,
                    createdAt: blog.createdAt.toISOString(),
                    updatedAt: blog.updatedAt.toISOString(),
                }));
                const csv = generateCsv(csvConfig)(formattedBlogs);
                download(csvConfig)(csv);
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Failed to export data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button onClick={handleDownloadAndExport} disabled={loading}>
            {loading ? 'Exporting...' : 'Export Data'}
        </Button>
    );
};

export default ExportButton;