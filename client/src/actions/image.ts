"use server"

export async function clodinaryUpload(formData : FormData){
    const file = formData.get("file")

    if(file instanceof File) {
        
    }
}