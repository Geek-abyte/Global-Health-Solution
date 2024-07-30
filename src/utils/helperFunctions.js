export function removeProperty(obj, prop) {
    // Check if the property exists in the object
    if (!obj.hasOwnProperty(prop)) {
      return obj; // Return the original object if the property does not exist
    }
    
    // Create a shallow copy of the object
    const newObj = { ...obj };
    
    // Delete the specified property
    delete newObj[prop];
    
    // Return the modified object
    return newObj;
  }
