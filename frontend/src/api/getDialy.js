const toJson = async (res) => {
    const json = await res.json();
    if(res.ok){
        return json;
    }else{
        throw new Error(json.message);
    }
}

export const getPostList = async() =>{
    const res = await fetch("http://localhost:8000/posts",{ method:"GET"})
    return await toJson(res)
}

export const getPost = async (id) => {
    const res = await fetch(`http://localhost:8000/posts/${id}`, {
        method : 'GET',
    })
    return await toJson(res);
}

//カテゴリ別一覧を取得
export const getCategoryPostList = async (cat) => {
    const res = await fetch(`http://localhost:8000/posts/folder/${cat}`, {
        method: 'GET',
    })
    return await toJson(res)
}


export const getCategoryName = async() =>{

    const res = await fetch(`http://localhost:8000/getcat`, {
        method: 'GET',

    })
    return await toJson(res)
}


