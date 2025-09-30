import sys
from camoufox.sync_api import Camoufox

import json
import os
import sys



url = "https://www.instagram.com/"
final_json_data = None

def get_json(response, username):
    """Handle JSON response and save to file"""
    if 'web_profile_info' in response.url:
        try:
            data = response.json()
            filename = os.path.join("DATA",f"{username}.json")
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=4)
            print(f"Successfully saved data for [bold]{username}[/] to {filename}[/]")
        except Exception as e:
            print(f"Error saving data for {username}: {e}[/]")

def abort_requests(route, request):
    if request.resource_type == "image" or any(ext in request.url.lower() for ext in [".png", ".jpg", ".jpeg"]):
        route.abort()
        return
    if request.resource_type == "media" or any(ext in request.url.lower() for ext in [".mp4", ".webm", ".avi"]):
        route.abort()
        return
    
    route.continue_() 

def run_scraper(camoufox : Camoufox, username: str) -> None:
    """Run the scraper for a single username"""
    try:
        page = camoufox.new_page()
        page.route("**/*", abort_requests)
        page.on("response", lambda response: get_json(response,username))
        page.goto(f'{url}{username}')
        page.wait_for_timeout(5000)

        page.close()
    except Exception as e:
        print(f"Error processing {username}: {e}", file=sys.stderr)
        global final_json_data
        final_json_data = {"error": str(e)}

# def run_scraper(camoufox: Camoufox, username: str) -> None:
#     """Run the scraper for a single username with scroll for additional data."""
#     try:
#         page = camoufox.new_page()
#         page.route("**/*", abort_requests)
#         page.on("response", lambda response: get_json(response, username))

        
#         page.goto(f"{url}{username}")
        
#         # Wait for initial page load and first network responses
#         page.wait_for_timeout(5000)

#         # Scroll once to trigger more data
#         page.evaluate("window.scrollBy(0, document.body.scrollHeight)")
        
#         # Wait again for network requests triggered by scroll
#         page.wait_for_timeout(5000)
        
#         # (Optional) small buffer wait to ensure all responses are captured
        

#         page.close()
#         print(f"✅ Done scraping {username}")
#     except Exception as e:
#         print(f"[{ERROR_STYLE}]Error processing {username}: {e}[/]")


# def get_user_choice():
#     """Prompt user for input method choice"""
#     print(Panel.fit("Instagram Profile Scraper", style=HEADER_STYLE))
#     print(f"[{INFO_STYLE}]Created by [bold]kevmaindev[/] | [link=https://github.com/kevmaindev]GitHub Link[/link][/]")
#     print(f"[{PROMPT_STYLE}]How would you like to provide usernames?[/]")
#     print("1. [bold]Single username[/]")
#     print("2. [bold]Text file[/] (one username per line)")
    
#     while True:
#         choice = Prompt.ask(
#             "[bold blue]Enter your choice (1 or 2):[/] ",
#             choices=["1", "2"],
#             show_choices=False
#         )
#         return choice

# def get_single_username():
#     """Prompt for single username"""
#     while True:
#         username = Prompt.ask("[bold blue]Enter the Instagram username:[/] ").strip()
#         if username:
#             return username
#         print(f"[{ERROR_STYLE}]Username cannot be empty. Please try again.[/]")

# def get_usernames_from_file():
#     """Read usernames from text file"""
#     while True:
#         file_path = Prompt.ask("[bold blue]Enter path to text file:[/] ").strip()
#         try:
#             with open(file_path, 'r') as f:
#                 usernames = [line.strip() for line in f.readlines() if line.strip()]
#             if not usernames:
#                 print(f"[{ERROR_STYLE}]File is empty. Please provide a file with usernames.[/]")
#                 continue
#             return usernames
#         except FileNotFoundError:
#             print(f"[{ERROR_STYLE}]File not found. Please try again.[/]")
#         except Exception as e:
#             print(f"[{ERROR_STYLE}]Error reading file: {e}[/]")

def main(username):
    os.makedirs('DATA',exist_ok=True)
    # print(f"[{SUCCESS_STYLE}]Created 'DATA' folder[/]")
    
    # choice = get_user_choice()
    
    # if choice == '1':
    #     usernames = [get_single_username()]
    # else:
    #     usernames = get_usernames_from_file()
    
    # print(f"[{INFO_STYLE}]Processing {len(usernames)} username(s)...[/]")
    
    with Camoufox(os=["windows", "macos", "linux"],humanize=2.0,locale="en-US") as browser:
        run_scraper(browser, username)
        try:
            run_scraper(browser, username)
        except Exception as e:
            print(f"Critical error processing {username}: {e}[/]")
        except KeyboardInterrupt:
            print(f"Process interrupted by user. Exiting...[/]")
            sys.exit(0)
        
    # if final_json_data:
    #     # This is the only print to stdout. Node.js will capture this.
    #     # print(final_json_data)
        
    #     sys.stdout.write(final_json_data)
    # else:
    #     # If no data was captured, print an error JSON
    #     print(json.dumps({"error": f"No profile data found for {username}"}))



if __name__ == "__main__":
    # --- How to accept the argument from Node.js ---
    # sys.argv[0] is the script name itself.
    # The first argument passed from Node.js will be in sys.argv[1].
    if len(sys.argv) > 1:
        username_from_args = sys.argv[1]
        try:
            main(username_from_args)
        except Exception as e:
            # Final fallback error
            print(({"error": f"A critical error occurred: {str(e)}"}))
    else:
        # If the script is run without arguments, print an error JSON
        print(({"error": "No username provided to the script."}))