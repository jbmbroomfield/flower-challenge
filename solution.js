export function findSolutions(total, bunchSizes, maxLength, sorted = false) {

    if (!sorted) {
        bunchSizes.sort((a, b) => b - a)
    }

    const largestSize = bunchSizes[0],
        quotient = total / largestSize,
        remainder = total % largestSize

    if (typeof maxLength === 'number' && Math.ceil(quotient) > maxLength) {
        return []
    }

    if (remainder === 0) {
        return [Array(quotient).fill(largestSize)]
    }

    let solutions = []
    for (let largestSizeUses = Math.floor(quotient); largestSizeUses >= 0; largestSizeUses--) {
        ({ solutions, maxLength } = findSolutionsPerLargestSizeUses(total, bunchSizes, maxLength, largestSize, largestSizeUses, solutions))
    }

    return solutions
}

function findSolutionsPerLargestSizeUses(total, bunchSizes, maxLength, largestSize, largestSizeUses, solutions) {

    const totalNew = total - largestSize * largestSizeUses,
        bunchSizesNew = bunchSizes.slice(1),
        maxLengthNew = typeof maxLength === 'number' ? maxLength - largestSizeUses : maxLength,
        newSubSolutions = findSolutions(totalNew, bunchSizesNew, maxLengthNew, true),
        newSolutions = newSubSolutions.map(solution => [...Array(largestSizeUses).fill(largestSize), ...solution]),
        latestSolution = newSolutions.length > 0 ? newSolutions[newSolutions.length - 1] : null
        
    solutions = [...solutions, ...newSolutions]
    if (latestSolution) {
        maxLength = latestSolution.length
    }
    return { solutions, maxLength }
}