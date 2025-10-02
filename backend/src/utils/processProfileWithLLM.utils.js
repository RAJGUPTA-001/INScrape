import Profile from '../models/flexidataschema.js';
import generateimagecaption from './generateimagecaption.utils.js';
import generatevideocaption from './generatevideocaption.utils.js';

const processProfileWithLLM = async function (id, profiledata) {
    try {
        // console.log(profiledata)
        console.log(`🚀 Starting LLM processing for profile ID: ${id}`);

        if (!profiledata || !profiledata.data.user.edge_owner_to_timeline_media) {
            throw new Error('Invalid profile data: missing edge_owner_to_timeline_media');
        }
        // ✅ SORT AND FILTER MEDIA BY __typename
        const imageMedia = [];
        const videoMedia = [];
        const sidecarMedia = [];
        const igtvvideoMedia = profiledata.data.user.edge_felix_video_timeline;
        if (!igtvvideoMedia.edges || !Array.isArray(igtvvideoMedia.edges)) {
            console.warn('No edges found in timeline media');
            console.log("proceeding to images");
        }
        igtvvideoMedia.edges.forEach((edge, index) => {
            const node = edge.node;

            if (!node || !node.__typename) {
                console.warn(`Skipping edge ${index}: missing node or __typename`);
                return;
            }

            const mediaItem = {
                id: node.id,
                displayUrl: node.display_url,
                __typename: node.__typename,
                isVideo: node.is_video || false,
                videoUrl: node.video_url || null,
            };



            // ✅ CATEGORIZE BY __typename
            switch (node.__typename) {
                case 'GraphVideo':
                    videoMedia.push(mediaItem);
                    break;

                // always video-----------------------------
                // case 'GraphImage':
                //     imageMedia.push(mediaItem);
                //     break;

                // case 'GraphSidecar':
                //     // For sidecar posts, also extract individual images
                //     sidecarMedia.push(mediaItem);
                //     // commented for simplicitty as sidecar as not processed in tjhe dashboard page
                //     // Extract individual images from sidecar
                //     // if (node.edge_sidecar_to_children && node.edge_sidecar_to_children.edges) {
                //     //     node.edge_sidecar_to_children.edges.forEach(childEdge => {
                //     //         const childNode = childEdge.node;
                //     //         if (childNode.__typename === 'GraphImage') {
                //     //             imageMedia.push({
                //     //                 id: childNode.id,
                //     //                 shortcode: childNode.shortcode,
                //     //                 displayUrl: childNode.display_url,
                //     //                 __typename: childNode.__typename,
                //     //                 parentId: node.id,
                //     //                 parentShortcode: node.shortcode,
                //     //                 isFromSidecar: true
                //     //             });
                //     //         }
                //     //     });
                //     // }
                //     break;



                default:
                    console.warn(`Unknown media type: ${node.__typename}`);
            }
        });










        // ✅ EXTRACT IMAGES AND VIDEOS FROM THE TIMELINE MEDIA
        const timelineMedia = profiledata.data.user.edge_owner_to_timeline_media;

        if (!timelineMedia.edges || !Array.isArray(timelineMedia.edges)) {
            console.warn('No edges found in timeline media');
            return { success: false, error: 'No media edges found' };
        }



        timelineMedia.edges.forEach((edge, index) => {
            const node = edge.node;

            if (!node || !node.__typename) {
                console.warn(`Skipping edge ${index}: missing node or __typename`);
                return;
            }

            const mediaItem = {
                id: node.id,
                displayUrl: node.display_url,
                __typename: node.__typename,
                isVideo: node.is_video || false,
                videoUrl: node.video_url || null,
                ai_analysis: null,
            };

            // ✅ CATEGORIZE BY __typename
            switch (node.__typename) {
                case 'GraphImage':
                    imageMedia.push(mediaItem);
                    break;

                case 'GraphSidecar':
                    // For sidecar posts, also extract individual images
                    sidecarMedia.push(mediaItem);
                    // commented for simplicitty as sidecar as not processed in tjhe dashboard page
                    // Extract individual images from sidecar
                    // if (node.edge_sidecar_to_children && node.edge_sidecar_to_children.edges) {
                    //     node.edge_sidecar_to_children.edges.forEach(childEdge => {
                    //         const childNode = childEdge.node;
                    //         if (childNode.__typename === 'GraphImage') {
                    //             imageMedia.push({
                    //                 id: childNode.id,
                    //                 shortcode: childNode.shortcode,
                    //                 displayUrl: childNode.display_url,
                    //                 __typename: childNode.__typename,
                    //                 parentId: node.id,
                    //                 parentShortcode: node.shortcode,
                    //                 isFromSidecar: true
                    //             });
                    //         }
                    //     });
                    // }
                    break;

                case 'GraphVideo':
                    videoMedia.push(mediaItem);
                    break;

                default:
                    console.warn(`Unknown media type: ${node.__typename}`);
            }
        });

        console.log(`📊 Media extracted:`);
        console.log(`   📸 Images: ${imageMedia.length}`);
        console.log(`   🎥 Videos: ${videoMedia.length}`);
        console.log(`   📋 Sidecars: ${sidecarMedia.length}`);

        // ✅ PROCESS IMAGES WITH GEMINI

         if (imageMedia.length > 0) {
            console.log(`🖼️ Processing ${imageMedia.length} images with AI...`);
            
            // ✅ USE FOR LOOP, NOT forEach FOR ASYNC OPERATIONS
            for (let i = 0; i < imageMedia.length; i++) {
                const image = imageMedia[i];
                
                try {
                    console.log(`Processing image ${i + 1}/${imageMedia.length} (ID: ${image.id})`);
                    
                    // ✅ CORRECT: Use single image URL array
                    const analysisResult = await generateimagecaption([image.displayUrl]);
                    
                    // ✅ Store the analysis result
                    if (analysisResult && !analysisResult.error) {
                        image.ai_analysis = analysisResult;
                        console.log(`✅ Analysis completed for image ${image.id}`);
                    } else {
                        image.ai_analysis = { error: true, message: 'Analysis failed' };
                    }
                    
                } catch (imageError) {
                    console.error(`❌ Image analysis failed for ${image.id}:`, imageError.message);
                    image.ai_analysis = { 
                        error: true, 
                        message: imageError.message 
                    };
                }
                
                
            }
        }

        // ✅ PREPARE MEDIA DICTIONARY/SUMMARY


        // ✅ UPDATE PROFILE IN DATABASE
        try {
            const updateData = {
                llmProcessed: true,
                status: 'completed',

                ai_analysis_image: null
            };

            if (imageMedia && !imageMedia.error) {
                updateData.ai_analysis_image = imageMedia;
            }

            await Profile.findByIdAndUpdate(id, updateData);
            console.log(`✅ Profile ${id} updated successfully in database`);

        } catch (dbError) {
            console.error('❌ Database update failed:', dbError);
        }

        // // ✅ RETURN COMPREHENSIVE RESULTS
        // return {
        //     success: true,
        //     profileId: id,
        //     mediaSummary,
        //     imageAnalysis: imageAnalysis && !imageAnalysis.error ? 
        //         (imageAnalysis.analysis || imageAnalysis) : null,
        //     errors: {
        //         imageError: imageAnalysis?.error ? imageAnalysis.message : null
        //     },
        //     processedAt: new Date().toISOString()
        // };

    } catch (error) {
        console.error(`❌ Critical error in processProfileWithLLM for profile ${id}:`, error);


    }
};

export default processProfileWithLLM;
