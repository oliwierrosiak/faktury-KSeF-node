function dateFilterSetter(lastDate)
{
    const date = new Date()
    date.setMonth(date.getMonth() - 3)
    date.setDate(date.getDate()+1)
    if(lastDate?.issueDate)
    {
        const threeMonthsAgo = date.toISOString().split('T')[0]
        if(lastDate.issueDate > threeMonthsAgo)
        {
            return `${lastDate.issueDate}T00:00:00Z`
        }
        else
        {
            return date
        }
    }
    else
    {
        return date
    }
}

export default dateFilterSetter