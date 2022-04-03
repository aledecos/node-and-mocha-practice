//remove duplicate of array of object elements
function remove_duplicate(x) {
    let store = x.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.id === value.id
        ))
    )
    return store;
}
  
//sorting array based on the sortBy element and also direction (asc or desc)
function sorting(array, sortBy = 'id', direction = 'asc') {
    let copyArray = array.slice(0);
    copyArray.sort(function(a,b) {
        return (direction === 'asc')? a[sortBy] - b[sortBy]: b[sortBy] - a[sortBy];
    });
    return copyArray;
}
  
module.exports = {remove_duplicate, sorting };