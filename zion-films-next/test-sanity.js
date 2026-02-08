const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-07';

if (!projectId) {
    console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID');
    process.exit(1);
}

async function testFetch() {
    const { createClient } = await import('next-sanity');

    const client = createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
    });

    try {
        console.log(`Connecting to project: ${projectId}, dataset: ${dataset}`);
        const projects = await client.fetch('*[_type == "project"]{_id, title}');
        console.log('Successfully fetched projects:', projects);
    } catch (error) {
        console.error('Fetch failed:', error.message);
    }
}

testFetch();
