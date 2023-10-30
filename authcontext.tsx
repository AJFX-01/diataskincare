snapshot.docs.forEach((doc: QueryDocumentSnapshot) => {
  const docData = doc.data() as Partial<CollectionData>;
  // Provide default values for missing properties
  const item: CollectionData = {
      id: doc.id,
      name: docData.name || "Default Name",
      price: docData.price || 0,
      description: docData.description || "Default Description",
      imageUrl: docData.imageUrl || "Default Image URL",
      brand: docData.brand || "Default Brand",
      Availability: docData.Availability || "Default Availability",
      category: docData.category || "Default Category",
  };
  allData.push(item);
});
