import { Router } from 'express';
import { makeResponse } from '../lib/response/index.js';
import { createBlog,deleteBlog,getBlog,getBlogs,updateBlog } from '../services/blogServices.js';
import { verifyUser } from '../middlewares/jwt.js';


const router = Router()

//createBlog
router.post('/create', verifyUser, async (req, res) => {

    try {

        const { BlogName,content } = req.body;
        console.log(req.body)
        //incase the blogs find duppi
        // const BlogExist = await getBlog({ BlogName: BlogName, status: 'ACTIVE' });
        
        // if (BlogExist && BlogExist.length>0  ) {
        //     return makeResponse(res, 400, false, 'Blog already exists with this name', BlogExist);
        // }

        const BlogCreate = await createBlog({ BlogName: BlogName, content: content, _user: req.user._id });

        await makeResponse(res, 200, true, 'Blog Created Successfully', BlogCreate);

    } catch (error) {
        console.log('error', error)
        await makeResponse(res, 400, false, 'Error While Creating Blog', error);
    }
})


//edit Blog
router.put('/update/:_id', verifyUser, async (req, res) => {

    try {

        const {  BlogName,content } = req.body;
        const BlogUpdate = await updateBlog({ _id:req.params , status: 'ACTIVE' }, { BlogName: BlogName,content:content });
        await makeResponse(res, 200, true, 'Blog Updated Successfully', BlogUpdate);

    } catch (error) {
        await makeResponse(res, 400, false, 'Error While Updating Blog', error);
    }
})



//delete Blog
router.delete('/delete', verifyUser, async (req, res) => {

    try {

        const { BlogId } = req.body;

        const BlogDelete = await deleteBlog({ _id: BlogId });

        await makeResponse(res, 200, true, 'Blog Deleted Successfully', BlogDelete);
    } catch (error) {
        await makeResponse(res, 400, false, 'Error While Deleting Blog', error);
    }
});

router.get('/', async (req, res) => {
    try {
        const fetchBlogs = await getBlogs({ status: 'ACTIVE' });

        await makeResponse(res, 200, true, 'Blogs Fetched Successfully', fetchBlogs);
    } catch (error) {
        await makeResponse(res, 400, false, 'Error While Fetching Blogs', error);
    }
});


router.get('/user',verifyUser, async (req, res) => {
    try {
        const Blog = await getBlog({ _user:req.user._id });
        await makeResponse(res, 200, true, 'Blog Fetched Successfully', Blog);
    } catch (error) {
        await makeResponse(res, 400, false, 'Error While Fetching Blog', error);
    }

});

export const blogController = router;
