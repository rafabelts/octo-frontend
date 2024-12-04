// user is number type because we are going to recive the id

export async function getUserCategories(user: number) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/categories?userId=${user}`,
      {
        method: 'GET',
      }
    );

    if (response.status === 200) {
      const categories = await response.json();
      return categories;
    }
  } catch {
    console.error('Error loading categories');
  }
}
