// Fetch medicine label info from OpenFDA API
export async function fetchMedicineLabel(medicineName) {
  const url = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${encodeURIComponent(medicineName)}&limit=1`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('OpenFDA API error');
    const data = await response.json();
    return data.results && data.results.length > 0 ? data.results[0] : null;
  } catch (error) {
    console.error('OpenFDA fetch error:', error);
    return null;
  }
}