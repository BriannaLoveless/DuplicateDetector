import { stringSimilarity } from 'string-similarity-js';
import fs from 'node:fs';

const data = fs.readFileSync('./input/advertisers.txt', 'utf8').split('\r\n');

/**
* Computes the string similarities between the provided 
* advertiser and all known advertisers and returns the results. 
* Results are filtered based on possible and likely thresholds.
*/
function computeSimilarities(currentAdvertiser, allAdvertisers, likelyThreshold=0.8, possibleThreshold=0.6) {
    // 1. Compute similarity
    let similarities = allAdvertisers.map((advertiser) => {
        // Ignore current advertiser
        if (currentAdvertiser == advertiser) {
            return { name: advertiser, score: -1 };
        }
        const score = stringSimilarity(currentAdvertiser, advertiser)
        return { name: advertiser, score: score };
    });

    // 2. Filter results
    const likelyMatches = similarities.filter((similarity) => similarity.score >= likelyThreshold);
    const possibleMatches = similarities.filter((similarity) => similarity.score >= possibleThreshold && similarity.score < likelyThreshold);

    // 3. Format Output
    const filteredResults = { likelyMatches, possibleMatches };
    return filteredResults
}

/**
 * Outputs the results of duplicate detection to the file system.
 */
function outputResults(similarityResults) {
    console.log("\nOutputting results to files")
    const likelyResultsFile = fs.createWriteStream('./output/likelyResults.txt');
    const possibleResultsFile = fs.createWriteStream('./output/possibleResults.txt');

    for (const companyName in similarityResults) {
        const likelyMatches = similarityResults[companyName].likelyMatches.map((m) => m.name);
        const possibleMatches = similarityResults[companyName].possibleMatches.map((m) => m.name);

        if (likelyMatches.length > 0) {
            likelyResultsFile.write(`${companyName.padEnd(40)}: ${likelyMatches.join(', ')}\n`);
        }
        if (possibleMatches.length > 0) {
            possibleResultsFile.write(`${companyName.padEnd(40)}: ${possibleMatches.join(', ')}\n`);
        }
    }
    likelyResultsFile.end()
    possibleResultsFile.end()
}

/** Program Entrypoint */
function main() {
  console.log("Note: This may take several minutes to run based on input size")
  // 1. Compute Similarities for all advertisers
  const similarityResults = {}
  let computationProgress = -1
  for (const [index, advertiser] of data.entries()) {
    similarityResults[advertiser] = computeSimilarities(advertiser, data)

    // Output Progress
    const currentProgress = parseInt((index / data.length) * 100)
    if(currentProgress % 1 == 0 && currentProgress != computationProgress){
      process.stdout.cursorTo(0);
      process.stdout.write(`Progress: ${currentProgress}%`);
      computationProgress = currentProgress
    }
  }

  // 2. Output Results
  outputResults(similarityResults);
  console.log("Done")
}

main()
