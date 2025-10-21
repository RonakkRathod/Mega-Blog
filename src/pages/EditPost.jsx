import React,{useEffect,useState} from 'react'
import {Container, PostForm} from "../index"
import appwriteService from "../../appwrite/database"
import { useParams, useNavigate } from 'react-router-dom'

function EditPost() {
    const [post,setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) { // check if slug/url was find in DB or not
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                }
            })
        }
    }, [slug,navigate]) // if any changes in slug or naviagate it will render again

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost