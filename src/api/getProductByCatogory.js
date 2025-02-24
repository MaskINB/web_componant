export async function getProductByCategory(categoryId) {
    try {
        const response = await fetch(`https://api.anemidox.live/api/v1/controllers/ProductController.php?category=${categoryId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}
