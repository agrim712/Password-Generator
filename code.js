const inputSlider=document.querySelector("[data-lengthSlider]")
const length=document.querySelector("[data-lengthNumber]")
const passwordDisplay=document.querySelector("[data-passwordDisplay]")
const copyMsg=document.querySelector("[data-copyMsg]")
const copyBtn=document.querySelector("[data-copy]")
const uppercaseCheck=document.querySelector("#uppercase")
const lowercaseCheck=document.querySelector("#lowercase")
const symbolsCheck=document.querySelector("#symbols")
const numbersCheck=document.querySelector("#numbers")
const indicator=document.querySelector("[data-indicator]")
const generateBtn=document.querySelector(".generate-container")
const check=document.querySelectorAll("input[type=checkbox]")
const sym="~`!@#$%^&*(){}_+-=[]|\?/";
const slider = document.querySelector(".slide")
let password="";
let passwordLength=10;
let checkcount = 0;
function handleSlider()
{
    length.innerText=passwordLength;
    const mi = inputSlider.min;
    const ma = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength - mi)*100/(ma-mi)+"% 100%");
}
function setValue()
{
    passwordLength = inputSlider.value;
    const mi = inputSlider.min;
    const ma = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength - mi)*100/(ma-mi)+"% 100%");
    handleSlider();
}
handleSlider();
function setIndicator(color)
{
    indicator.style.backgroundColor = color;
}
function getRandom()
{
    let min = 0;
    let max = 10;
    const r = Math.floor(Math.random() * (max-min)) + min;
    console.log(r);
    return r
}
function getLowercase()
{
    let min=97;
    let max=123;
    let a = Math.floor(Math.random() * (max-min)) + min;
    let str = String.fromCharCode(a)
    console.log(str)
    return str
}
function getUppercase()
{
    min=65;
    max=91;
    let a = Math.floor(Math.random() * (max-min) + min)
    let str = String.fromCharCode(a);
    console.log(str)
    return str
}
function getSymbols()
{
    min = 0
    max = sym.length;
    let a = Math.floor(Math.random() * (max-min) + min);
    let st = sym[a];
    console.log(st);
    return st
}
function getNumber(min,max)
{
    const n = Math.floor(Math.random() * (max-min)) + min;
    console.log(n);
    return n
}
function calcStrength()
{
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked)
    {
        hasUpper = true;
    }
    if(lowercaseCheck.checked)
    {
        hasLower = true;
    }
    if(numbersCheck.checked)
    {
        hasNum = true;
    }
    if(symbolsCheck.checked)
    {
        hasSym = true;
    }
    if(hasUpper === true && hasLower === true && hasNum === true || hasSym === true && password.length>=8)
    {
        setIndicator("#0f0");
    }
    else if ((hasLower === true|| hasUpper === true) && (hasNum === true || hasSym === true) && password.length>=6){
        setIndicator("#ff0");
    }
    else
    {
        setIndicator("#f00"); 
    }
}
async function copied()
{
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied"
    }
    catch(e)
    {
        copyMsg.innerText = "failed"
    }
    copyMsg.classList.add("active")
    setTimeout( () =>{
        copyMsg.classList.remove("active");
    },2000)
}

calcStrength();
function handleCheckBox()
{
    checkcount = 0
    check.forEach( (checkbox) => 
    {
        if(checkbox.checked)
        {
            checkcount++;
        }
    })
    // if(passwordLength<checkcount)
    // {
    //     passwordLength = checkcount
    //     setValue();
    // }
    // console.log(checkcount)
}
check.forEach((checkbox)=>
{
    checkbox.addEventListener('change', handleCheckBox)
})
copyBtn.addEventListener("click",()=>
{
    if(passwordDisplay.value!="")
    {
        copied();
    }
})
function ShufflePass(array)
{
    //Fisher Yates Method
    for(let i = array.length-1;i>0;i--)
    {
        const j=Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let strr = "";
    array.forEach( (el) => (strr += el));
    return strr;
}
generateBtn.addEventListener("click",()=>
{
    if(checkcount === 0)
    {
        return;
    } 
    if(passwordLength<checkcount)
    {
        passwordLength = checkcount
        inputSlider.value = passwordLength;
        handleSlider();
    }
    password="";
    let funArr =[];
    if(uppercaseCheck.checked)
    {
        funArr.push(getUppercase)
    }
    if(lowercaseCheck.checked)
    {
        funArr.push(getLowercase)
    }
    if(symbolsCheck.checked)
    {
        funArr.push(getSymbols)
    }
    if(numbersCheck.checked)
    {
        funArr.push(getRandom)
    }
    console.log(funArr)
    for(let i=0;i<funArr.length;i++)
    {
        password +=funArr[i]();
    }
    for(let i=0;i<passwordLength-funArr.length;i++)
    {
        let randIndex = getNumber(0,funArr.length);
        console.log("randIndex " + randIndex);
        console.log(funArr.length);
        password += funArr[randIndex]();
    }
    password = ShufflePass(Array.from(password)); 
    passwordDisplay.value = password;
    calcStrength();  
})
setIndicator("#ccc");
inputSlider.addEventListener("input",setValue)