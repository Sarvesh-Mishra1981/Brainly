export function random(len:number){
    const string="asdgfkfihyfhnnekjnnfhtywioromnsg27893un3892nbgdhndfbhjfbhfhebhygbfjbfhvbhcbc"
    const length=string.length
    let ans=""
    for(let i=0;i<len;i++){
        ans+=string[Math.floor(Math.random()*length)]
    }
    return ans;
}
