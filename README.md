# Duplicate Detector
Author: Brianna Loveless  
This application is used to detect duplicate advertiser names from a list of advertisers.
Results are output to the file system.

## How to Run
1. Install dependencies: `npm install`
2. Ensure input file located in `input` folder is up to date
3. Execute application: `node index.js`

Note: Application may take several minutes to complete due to input size.

## Context
- The Sørensen–Dice algorithm is used as it provides effective similarity matching with adequate efficiency. 
    - This was chosen in favor of a Levenshtein Distance algorithm for its increased accuracy given the provided data set.
    - Limitations of the Sørensen–Dice algorithm include decreased accuracy for shorter strings due to the use of bigrams for the comparison.
- Default similarity score threshold values were set based on testing and are configurable to accommodate other datasets.
- Multithreading was left out to maintain simplicity in this implementation.

## Potential Improvements
1. Multithreading using Javascript Service Workers would reduce the overall time cost of the implementation.
2. Preprocessing the comparison list with a cheaper algorithm may result in some time savings.
3. Using a machine learning clustering approach may yield more accurate results and time savings on large datasets. This approach was not implemented due to assessment time constraints.
4. Sorting the output by similarity score sould improve usefullness.
