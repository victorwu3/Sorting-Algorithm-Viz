
export const handleModalButtons = () =>{
  let infoButton = document.querySelector('#info-modal');
  let modalDiv = document.querySelector('#modal-location');

  infoButton.addEventListener("click", (e) =>{
    e.preventDefault();
    let html = '<div class="modal-backdrop"><div class="modal-inner"><h2>Sorting Algorithms</h2>';
    html+= '<p>Each button will initiate a different sorting algorithm</p>';
    html+= '<p>Selection Sort: O(n^2) - Finds the smallest element on every run through the list and places at the front</p>';
    html+= '<p>Insertion Sort: O(n^2) - Inserts elements one element at a time</p>';
    html+= '<p>Bubble Sort: O(n^2) - Repeatedly swaps adjacent elements if they are in wrong order</p>';
    html+= '<p>Cocktail Sort: O(n^2) - A variation of bubble sort that sorts in both directions</p>';
    html+= '<p>Merge Sort: O(n log n) - Divides the list into n sublists of 1 element then repeatedly merges sublists into sorted sublists until final sorted list</p>';
    html+= '<p>Quick Sort: O(n^2) - Divides list into two smaller sub-arrays of low and high elements, then recursively calls quick sort on sub-arrays</p>';
    html+= '<p>Heap Sort: O(n log n) - Builds a max heap from the input data then builds a sorted list with the max element and repeatedly heapifying result.</p>';
    html+= '<p>Bogo Sort: O(n log n) - Randomly generates a permutation of the list</p>';
    html+='<div class="close-modal">X</div>';
    html+= '</div></div>';
    modalDiv.innerHTML = html;
    document.querySelector('.modal-backdrop').addEventListener("click", (e) =>{
      e.preventDefault();
      modalDiv.innerHTML = '';
    });
  });
}
