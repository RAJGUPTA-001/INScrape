#  INscrape

Can scrape any public profile and generate insights from scraped data, image processing using GOOGLE cloud for detail caption. 

[![GitHub stars](https://img.shields.io/github/stars/username/repo)](https://github.com/username/repo/stargazers)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/travis/username/repo)](https://travis-ci.org/username/repo)

## 📋 Table of Contents

- [Features](#features)

- [Installation](#installation)

- [Details](#details)

- [Credits](#credits)

- [Example fetched data](#example_data)



## ✨ Features

 - scrapes data from public instagram profiles
 - displays post and video/reels on dashboard with original caption likes ,  comments and views count 
 - Load all images and data in real time so no need for storing media 







## 🛠️ Installation

### Prerequisites
(Suggested , to avoid any dependency issue)
- Node.js - v22.17.1
- npm - 11.6.1
- MongoDB - v8.2.0
- Python - 3.9.23

### Steps

#### Creating .env 

> make sure its in backend folder

PORT=3000||or your preferred port
NODE_ENV=production
MONGO_URL=mongodb://127.0.0.1:27017/your_database_name
ENV_PATH= /path/to/virtual/enviroment/or/your/python/interpreter
GEMINI_API_KEY=[GET YOUR KEY FROM](https://aistudio.google.com/api-keys)






run from terminal - 
Multiple lines:
git clone https://github.com/RAJGUPTA-001/INScrape.git
cd INScrape


> Consider making virtual enviroment for python interpreter
> you can use conda for management
> then provide the path for the enviremont at .env file 
> path will be like -  C:*miniconda3\envs\envname\python.exe   (if using conda)

from root run - 

(some unnecesary libraries are also included 😶)

Single line: pip install -r requirements.txt

### Starting application
from root - 

Multiple lines:
npm run build
npm run start

> application at localhost:3000 
> or configure the port at .env file




## Details


IT fetches public instagrams profile data and stores it in database (local in this case)
stores the data and links to the media  
> links overtime get expire which will give  "NotSupportedError: Failed to load because no supported source was found."
it can be solved by fetching latest data  , its not necessary that all links will expire of any post .



The average stats of engagement is calculated on the last 12 post of user 

some bugs in here are :
  the slider when slided from left to right  even the center profile is not clicking but from right to left its working ,
  all of the right sides are working properly
  

  the console log for debugging are not replaced or commented out 



for side cars and video   AI analysis is not done  (Its not some bug )
video analysis for longer video can be done using fileapi from google cloud or any other api or local model 
sidecar post are not handeled  and they show only the display image of the post 
(sidecar are post instagram with multiple photos or videos)


the node edge_owner_to_timeline_media from the data has timeline posts and  edge_felix_video_timeline has igtv videos from the posts
the reels and side cars are on the edge_owner_to_timeline_media node.







## Credits 
  

https://github.com/kevmaindev









## example data

{
    "data": {
        "user": {
            "ai_agent_owner_username": null,
            "ai_agent_type": null,
            "biography": "I talk more in movies than in real life...",
            "bio_links": [],
            "fb_profile_biolink": null,
            "biography_with_entities": {
                "raw_text": "I talk more in movies than in real life...",
                "entities": []
            },
            "blocked_by_viewer": false,
            "restricted_by_viewer": null,
            "country_block": false,
            "eimu_id": "113601876704258",
            "external_url": null,
            "external_url_linkshimmed": null,
            "edge_followed_by": {
                "count": 12250802
            },
            "fbid": "17841402389166695",
            "followed_by_viewer": false,
            "edge_follow": {
                "count": 25
            },
            "follows_viewer": false,
            "full_name": "Ajay Devgn",
            "group_metadata": null,
            "has_ar_effects": false,
            "has_clips": true,
            "has_guides": false,
            "has_channel": false,
            "has_blocked_viewer": false,
            "highlight_reel_count": 8,
            "has_onboarded_to_text_post_app": true,
            "has_requested_viewer": false,
            "hide_like_and_view_counts": false,
            "id": "2373567638",
            "is_business_account": false,
            "is_professional_account": true,
            "is_supervision_enabled": false,
            "is_guardian_of_viewer": false,
            "is_supervised_by_viewer": false,
            "is_supervised_user": false,
            "is_embeds_disabled": false,
            "is_joined_recently": false,
            "guardian_id": null,
            "business_address_json": null,
            "business_contact_method": "UNKNOWN",
            "business_email": null,
            "business_phone_number": null,
            "business_category_name": null,
            "overall_category_name": null,
            "category_enum": null,
            "category_name": "Public figure",
            "is_private": false,
            "is_verified": true,
            "is_verified_by_mv4b": false,
            "is_regulated_c18": false,
            "edge_mutual_followed_by": {
                "count": 0,
                "edges": []
            },
            "pinned_channels_list_count": 0,
            "profile_pic_url": "link",
            "profile_pic_url_hd": "link",
            "requested_by_viewer": false,
            "should_show_category": false,
            "should_show_public_contacts": false,
            "show_account_transparency_details": true,
            "show_text_post_app_badge": false,
            "remove_message_entrypoint": false,
            "transparency_label": null,
            "transparency_product": null,
            "username": "ajaydevgn",
            "pronouns": [],
            "edge_felix_video_timeline": {
                "count": 74,
                "page_info": {
                    "has_next_page": true,
                    "end_cursor": "QVFBLTBtRg=="
                },
                "edges": [
                    {
                        "node": {
                            "__typename": "GraphVideo",
                            "id": "2928348454350816647",
                            "shortcode": "CijlWd4JQWH",
                            "dimensions": {
                                "height": 995,
                                "width": 640
                            },
                            "display_url" :"link",
                             "edge_media_to_tagged_user": {
                                "edges": []
                            },
                            "fact_check_overall_rating": null,
                            "fact_check_information": null,
                            "gating_info": null,
                            "sharing_friction_info": {
                                "should_have_sharing_friction": false,
                                "bloks_app_url": null
                            },
                            "media_overlay_info": null,
                            "media_preview": "AByTTpR/9k=",
                            "owner": {
                                "id": "2373567638",
                                "username": "ajaydevgn"
                            },
                            "is_video": true,
                            "has_upcoming_event": false,
                            "accessibility_caption": null,
                            "dash_info": {
                                "is_dash_eligible": true,
                                "video_dash_manifest": "<?xml ",
                                  "number_of_qualities": 2
                            },
                            "has_audio": true,
                            "tracking_token": "eJ9",
                            "video_url": "link",
                              "video_view_count": 2084027,
                            "edge_media_to_caption": {
                                "edges": [
                                    {
                                        "node": {
                                            "text": "Arey, @kajol beat me to it 🤔"
                                        }
                                    }
                                ]
                            },
                            "edge_media_to_comment": {
                                "count": 2111
                            },
                            "comments_disabled": false,
                            "taken_at_timestamp": 1663306430,
                            "edge_liked_by": {
                                "count": 345589
                            },
                            "edge_media_preview_like": {
                                "count": 345589
                            },
                            "location": null,
                            "nft_asset_info": null,
                            "thumbnail_src": "link",
                             "thumbnail_tall_src": "link",
                              "thumbnail_resources": [
                                {
                                    "src": "link",
                                    "config_width": 150,
                                    "config_height": 150
                                },
                                {
                                    "src": "link",
                                    "config_width": 240,
                                    "config_height": 240
                                },
                                {
                                    "src": "link",
                                    "config_width": 320,
                                    "config_height": 320
                                },
                                {
                                    "src": "link",
                                    "config_width": 480,
                                    "config_height": 480
                                },
                                {
                                    "src": "link",
                                    "config_width": 640,
                                    "config_height": 640
                                }
                            ],
                            "felix_profile_grid_crop": null,
                            "tall_profile_grid_crop": null,
                            "profile_grid_thumbnail_fitting_style": "UNSET",
                            "coauthor_producers": [],
                            "pinned_for_users": [],
                            "viewer_can_reshare": true,
                            "like_and_view_counts_disabled": false,
                            "encoding_status": null,
                            "is_published": true,
                            "product_type": "igtv",
                            "title": "",
                            "video_duration": 12.2
                        }
                    }
                ]
            },
            "edge_owner_to_timeline_media": {
                "count": 887,
                "page_info": {
                    "has_next_page": true,
                    "end_cursor": "QVFvVg=="
                },
                "edges": [
                    {
                        "node": {
                            "__typename": "GraphSidecar",
                            "id": "3731402662320431287",
                            "shortcode": "DPImvOZjmC3",
                            "dimensions": {
                                "height": 1440,
                                "width": 1080
                            },
                            "display_url": "link",
                            "edge_media_to_tagged_user": {
                                "edges": []
                            },
                            "fact_check_overall_rating": null,
                            "fact_check_information": null,
                            "gating_info": null,
                            "sharing_friction_info": {
                                "should_have_sharing_friction": false,
                                "bloks_app_url": null
                            },
                            "media_overlay_info": null,
                            "media_preview": null,
                            "owner": {
                                "id": "2373567638",
                                "username": "ajaydevgn"
                            },
                            "is_video": false,
                            "has_upcoming_event": false,
                            "accessibility_caption": "Photo  शकते.",
                            "edge_media_to_caption": {
                                "edges": [
                                    {
                                        "node": {
                                            "text": "Dan,  ❤️ \n@danishdevgn"
                                        }
                                    }
                                ]
                            },
                            "edge_media_to_comment": {
                                "count": 433
                            },
                            "comments_disabled": false,
                            "taken_at_timestamp": 1759037882,
                            "edge_liked_by": {
                                "count": 98629
                            },
                            "edge_media_preview_like": {
                                "count": 98629
                            },
                            "location": null,
                            "nft_asset_info": null,
                            "thumbnail_src":"link", 
                            "thumbnail_tall_src": "link",
                            "thumbnail_resources": [
                                {
                                    "src": "link",
                                    "config_width": 150,
                                    "config_height": 150
                                },
                                {
                                    "src": "link",
                                    "config_width": 240,
                                    "config_height": 240
                                },
                                {
                                    "src": "link",
                                    "config_width": 320,
                                    "config_height": 320
                                },
                                {
                                    "src": "link",
                                    "config_width": 480,
                                    "config_height": 480
                                },
                                {
                                    "src": "link",
                                    "config_width": 640,
                                    "config_height": 640
                                }
                            ],
                            "tall_profile_grid_crop": null,
                            "profile_grid_thumbnail_fitting_style": "UNSET",
                            "coauthor_producers": [],
                            "pinned_for_users": [],
                            "viewer_can_reshare": true,
                            "like_and_view_counts_disabled": false,
                            "edge_sidecar_to_children": {
                                "edges": [
                                    {
                                        "node": {
                                            "__typename": "GraphImage",
                                            "id": "3731402653269161809",
                                            "shortcode": "DPImvF-DvdR",
                                            "dimensions": {
                                                "height": 1440,
                                                "width": 1080
                                            },
                                            "display_url": "link",
                                             "edge_media_to_tagged_user": {
                                                "edges": []
                                            },
                                            "fact_check_overall_rating": null,
                                            "fact_check_information": null,
                                            "gating_info": null,
                                            "sharing_friction_info": {
                                                "should_have_sharing_friction": false,
                                                "bloks_app_url": null
                                            },
                                            "media_overlay_info": null,
                                            "media_preview": null,
                                            "owner": {
                                                "id": "2373567638",
                                                "username": "ajaydevgn"
                                            },
                                            "is_video": false,
                                            "has_upcoming_event": false,
                                            "accessibility_caption": "Photo ."
                                        }
                                    },
                                    {
                                        "node": {
                                            "__typename": "GraphImage",
                                            "id": "3731402653243976128",
                                            "shortcode": "DPImvF8jqnA",
                                            "dimensions": {
                                                "height": 1436,
                                                "width": 1080
                                            },
                                            "display_url": "link",
                                            "edge_media_to_tagged_user": {
                                                "edges": []
                                            },
                                            "fact_check_overall_rating": null,
                                            "fact_check_information": null,
                                            "gating_info": null,
                                            "sharing_friction_info": {
                                                "should_have_sharing_friction": false,
                                                "bloks_app_url": null
                                            },
                                            "media_overlay_info": null,
                                            "media_preview": "ACdi7dSc1fYrD9w",
                                            "owner": {
                                                "id": "2373567638",
                                                "username": "ajaydevgn"
                                            },
                                            "is_video": false,
                                            "has_upcoming_event": false,
                                            "accessibility_caption": "Photo  शकते."
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    {
                        "node": {
                            "__typename": "GraphImage",
                            "id": "3729949092572495105",
                            "shortcode": "DPDcPAFEv0B",
                            "dimensions": {
                                "height": 1350,
                                "width": 1080
                            },
                            "display_url": "link",
                            "edge_media_to_tagged_user": {
                                "edges": [
                                    {
                                        "node": {
                                            "user": {
                                                "full_name": "Mrunal Thakur",
                                                "followed_by_viewer": false,
                                                "id": "2658966811",
                                                "is_verified": true,
                                                "profile_pic_url": "link",
                                                "username": "mrunalthakur"
                                            },
                                            "x": 0.8675213675000001,
                                            "y": 0.7260683761000001
                                        }
                                    },
                                    {
                                        "node": {
                                            "user": {
                                                "full_name": "Ajay Devgn",
                                                "followed_by_viewer": false,
                                                "id": "2373567638",
                                                "is_verified": true,
                                                "profile_pic_url": "link",
                                                "username": "ajaydevgn"
                                            },
                                            "x": 0.5042735043000001,
                                            "y": 0.3628205128
                                        }
                                    },
                                    {
                                        "node": {
                                            "user": {
                                                "full_name": "Ravi Kishan",
                                                "followed_by_viewer": false,
                                                "id": "573880058",
                                                "is_verified": true,
                                                "profile_pic_url": "link",
                                                 "username": "ravikishann"
                                            },
                                            "x": 0.14871794870000002,
                                            "y": 0.5619658120000001
                                        }
                                    },
                                    {
                                        "node": {
                                            "user": {
                                                "full_name": "DEVGN FILMS",
                                                "followed_by_viewer": false,
                                                "id": "44103929427",
                                                "is_verified": true,
                                                "profile_pic_url": "link",
                                                "username": "devgnfilms"
                                            },
                                            "x": 0.0653594807,
                                            "y": 0.6876068376000001
                                        }
                                    }
                                    
                                ]
                            },
                            "fact_check_overall_rating": null,
                            "fact_check_information": null,
                            "gating_info": null,
                            "sharing_friction_info": {
                                "should_have_sharing_friction": false,
                                "bloks_app_url": null
                            },
                            "media_overlay_info": null,
                            "media_preview": "AcA+2RxUf/2Q==",
                            "owner": {
                                "id": "3229110093",
                                "username": "netflix_in"
                            },
                            "is_video": false,
                            "has_upcoming_event": false,
                            "accessibility_caption": "Photo ",
                                "edges": [
                                    {
                                        "node": {
                                            "text": "Pehla @danishdevgn"
                                        }
                                    }
                                ]
                            },
                            "edge_media_to_comment": {
                                "count": 389
                            },
                            "comments_disabled": false,
                            "taken_at_timestamp": 1758864603,
                            "edge_liked_by": {
                                "count": 51129
                            },
                            "edge_media_preview_like": {
                                "count": 51129
                            },
                            "location": null,
                            "nft_asset_info": null,
                            "thumbnail_src": "link",
                            "thumbnail_tall_src": "link",
                            "thumbnail_resources": [
                                {
                                    "src": "link",
                                    "config_width": 150,
                                    "config_height": 150
                                },
                                {
                                    "src": "link",
                                    "config_width": 240,
                                    "config_height": 240
                                },
                                {
                                    "src": "link",
                                    "config_width": 320,
                                    "config_height": 320
                                },
                                {
                                    "src": "link",
                                    "config_width": 480,
                                    "config_height": 480
                                },
                                {
                                    "src": "link",
                                    "config_width": 640,
                                    "config_height": 640
                                }
                            ],
                            "tall_profile_grid_crop": null,
                            "profile_grid_thumbnail_fitting_style": "UNSET",
                            "coauthor_producers": [
                                {
                                    "id": "573880058",
                                    "is_verified": true,
                                    "profile_pic_url": "link",
                                     "username": "ravikishann"
                                }
                                
                            ],
                            "pinned_for_users": [
                                {
                                    "id": "9060310421",
                                    "is_verified": true,
                                    "profile_pic_url": "link",
                                    "username": "officialjiostudios"
                                }
                            ],
                            "viewer_can_reshare": true,
                            "like_and_view_counts_disabled": false
                        },
                    
                    {
                        "node": {
                            "__typename": "GraphVideo",
                            "id": "3727055268513597521",
                            "shortcode": "DO5KQUaAEhR",
                            "dimensions": {
                                "height": 1137,
                                "width": 640
                            },
                            "display_url": "link",
                             "edge_media_to_tagged_user": {
                                "edges": [
                                    {
                                        "node": {
                                            "user": {
                                                "full_name": "Ajay Devgn",
                                                "followed_by_viewer": false,
                                                "id": "2373567638",
                                                "is_verified": true,
                                                "profile_pic_url": "link",
                                                "username": "ajaydevgn"
                                            },
                                            "x": 0.0,
                                            "y": 0.0
                                        }
                                    }
                                ]
                            },
                            "fact_check_overall_rating": null,
                            "fact_check_information": null,
                            "gating_info": null,
                            "sharing_friction_info": {
                                "should_have_sharing_friction": false,
                                "bloks_app_url": null
                            },
                            "media_overlay_info": null,
                            "media_preview": "ABgq5m==",
                            "owner": {
                                "id": "71616517360",
                                "username": "summercoolofficial_"
                            },
                            "is_video": true,
                            "has_upcoming_event": false,
                            "accessibility_caption": null,
                            "dash_info": {
                                "is_dash_eligible": true,
                                "video_dash_manifest": "<?xml </MPD>\n",
                                "number_of_qualities": 2
                            },
                            "has_audio": true,
                            "tracking_token": "ey6IiJ9",
                            "video_url": "link",
                             "video_view_count": 192500,
                            "edge_media_to_caption": {
                                "edges": [
                                    {
                                        "node": {
                                            "text": "Hawa ac #coolvibes"
                                        }
                                    }
                                ]
                            },
                            "edge_media_to_comment": {
                                "count": 147
                            },
                            "comments_disabled": false,
                            "taken_at_timestamp": 1758519927,
                            "edge_liked_by": {
                                "count": 8127
                            },
                            "edge_media_preview_like": {
                                "count": 8633
                            },
                            "location": null,
                            "nft_asset_info": null,
                            "thumbnail_src": "link",
                             "thumbnail_tall_src": "link",
                              "thumbnail_resources": [
                                {
                                    "src": "link",
                                    "config_width": 150,
                                    "config_height": 150
                                },
                                {
                                    "src": "link",
                                    "config_width": 240,
                                    "config_height": 240
                                },
                                {
                                    "src": "link",
                                    "config_width": 320,
                                    "config_height": 320
                                },
                                {
                                    "src": "link",
                                    "config_width": 480,
                                    "config_height": 480
                                },
                                {
                                    "src": "link",
                                    "config_width": 640,
                                    "config_height": 640
                                }
                                
                            ],
                            "felix_profile_grid_crop": null,
                            "tall_profile_grid_crop": {
                                "crop_left": 0.0,
                                "crop_right": 1.0,
                                "crop_top": 0.17395833134651184,
                                "crop_bottom": 0.9239583611488342
                            },
                            "profile_grid_thumbnail_fitting_style": "UNSET",
                            "coauthor_producers": [
                                {
                                    "id": "2373567638",
                                    "is_verified": true,
                                    "profile_pic_url": "link",
                                     "username": "ajaydevgn"
                                }
                            ],
                            "pinned_for_users": [
                                {
                                    "id": "71616517360",
                                    "is_verified": false,
                                    "profile_pic_url": "link",
                                         "username": "summercoolofficial_"
                                }
                            ],
                            "viewer_can_reshare": true,
                            "like_and_view_counts_disabled": false,
                            "product_type": "clips",
                            "clips_music_attribution_info": {
                                "artist_name": "summercoolofficial_",
                                "song_name": "Original audio",
                                "uses_original_audio": true,
                                "should_mute_audio": false,
                                "should_mute_audio_reason": "",
                                "audio_id": "31350026377979036"
                            }
                        }
                    }
                   
                ]
            },
            "edge_saved_media": {
                "count": 0,
                "page_info": {
                    "has_next_page": false,
                    "end_cursor": null
                },
                "edges": []
            },
            "edge_media_collections": {
                "count": 0,
                "page_info": {
                    "has_next_page": false,
                    "end_cursor": null
                },
                "edges": []
            },
            "edge_related_profiles": {
                "edges": [
                    
                    {
                        "node": {
                            "id": "391254253",
                            "full_name": "Vicky Kaushal",
                            "is_private": false,
                            "is_verified": true,
                            "profile_pic_url": "link",
                             "username": "vickykaushal09"
                        }
                    }
                ]
            }
        }
    },
    "status": "ok"
}