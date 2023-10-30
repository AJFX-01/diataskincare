const convertCollectionDataToProduct = (collectionData: CollectionData[]): Product[] => {
  return collectionData.map((data: CollectionData) => {
    // Perform the conversion here
    return {
      id: data.id,
      name: data.name,
      price: data.price,
      description: data.description,
      imageUrl: data.imageUrl,
      // Map other properties as needed
    };
  });
};