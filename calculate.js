const submitBtn=document.getElementById('calculate');
const outputDiv=document.getElementById('output');

submitBtn.addEventListener('click', function(e){

    e.preventDefault();
    const lumpsumAmount=document.getElementById("lumpsum").value;
    const monthlyContribution=document.getElementById("contribution").value;
    const expectedReturn=(document.getElementById("expectedReturn").value)/100;
    const expectedInflation=(document.getElementById("expectedInflation").value)/100;
    const noOfYears=document.getElementById("duration").value;
    const noOfMonths=noOfYears*12;

    calculateReturn=()=>{
        const expectedMonthlyReturn=(expectedReturn-expectedInflation)/12;
        const futureValue=lumpsumAmount*Math.pow((1+(expectedReturn-expectedInflation)),noOfYears)+monthlyContribution*((Math.pow((1+expectedMonthlyReturn),noOfMonths)-1)/expectedMonthlyReturn)*(1+expectedMonthlyReturn);
        return futureValue;
    }

    const amount=Math.trunc(calculateReturn());

    if(amount>10000000){
        outputDiv.innerHTML=``;

        let para=document.createElement('p');
        para.innerHTML=`<h1>Congrats You can be a crorepati! You will have ${amount} of today's money in ${noOfYears} years</h1>`;
        outputDiv.appendChild(para);
    }else{
        outputDiv.innerHTML=``;

        calculateWithYearlyIncrement=(inc)=>{
            let futureValue=0;
            let monthlyAmount=monthlyContribution;
            const expectedMonthlyReturn=(expectedReturn-expectedInflation)/12;
            for(let i=1;i<=noOfYears;i++){
                futureValue=futureValue*Math.pow(1+(expectedMonthlyReturn),12) +monthlyAmount*((Math.pow((1+expectedMonthlyReturn),12)-1)/expectedMonthlyReturn)*(1+expectedMonthlyReturn);
                monthlyAmount=monthlyAmount*(1+inc);
            }
            return futureValue;
        }

        let increase=0.01;
        while(calculateWithYearlyIncrement(increase)<10000000){
            increase=increase+0.01;
        }
    
    
        calculateIncreasedReturn=(ret)=>{
            const expectedMonthlyReturn=(ret-expectedInflation)/12;
            const futureValue=lumpsumAmount*Math.pow((1+(ret-expectedInflation)),noOfYears)+monthlyContribution*((Math.pow((1+expectedMonthlyReturn),noOfMonths)-1)/expectedMonthlyReturn)*(1+expectedMonthlyReturn);
            return futureValue;
        }
    
        let returns=expectedReturn+0.01;
        while(calculateIncreasedReturn(returns)<10000000){
            returns=returns+0.01;
        }
    
        calculateAmountRequired=(contributn)=>{
            console.log(contribution);
            const expectedMonthlyReturn=(expectedReturn-expectedInflation)/12;
            const futureValue=lumpsumAmount*Math.pow((1+(expectedReturn-expectedInflation)),noOfYears)+contributn*((Math.pow((1+expectedMonthlyReturn),noOfMonths)-1)/expectedMonthlyReturn)*(1+expectedMonthlyReturn);
            return futureValue;
        }
        let contribution=parseInt(monthlyContribution)+500;
        while(calculateAmountRequired(contribution)<10000000){
            contribution=contribution+500;
        }


        let para=document.createElement('p');
        let listItem1=document.createElement('span');
        let listItem2=document.createElement('span');
        let listItem3=document.createElement('span');

        para.innerHTML=`<h1>Sorry You wont be a crorepati, You will have ${amount} of today's money in ${noOfYears} years. Below are some ways you can be one:-</h1><br>`;

        listItem1.innerHTML=`<h2> You could invest same amount but generate ${Math.trunc(returns*100)}% returns/year.</h2>`;
        listItem2.innerHTML=`<h2> You could start investing ${Math.trunc(contribution)} instead of ${monthlyContribution}.</h2>`;
        listItem3.innerHTML=`<h2> You could continue increasing monthly contribution by ${Math.trunc(increase*100)}% per year.</h2>`;

        outputDiv.appendChild(para);
        outputDiv.appendChild(listItem1);
        outputDiv.appendChild(listItem2);
        outputDiv.appendChild(listItem3);

        console.log(increase);
        console.log(returns);
        console.log(contribution);
    }
})
