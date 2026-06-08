# The Coder Cave
## Conceptos IA
https://www.youtube.com/watch?v=LHyjYJm8i2Y

## MCP Overview
https://www.youtube.com/watch?v=k2jmYr1x5Tk

# Links to review for Agent specs
https://github.com/msitarzewski/agency-agents 


# Udemy Ligency Ed Donner learning PAth
AI Builder - N8N
AI Egineer
    MLOps Track
    Agentic Track *
    Core Track
AI Leader
LLM 
---
AI Coder - This course

# Udemy Ligency Ed Donner IA Coder Notes

# Tools
* Openrouter.ai -> single pay, multiple LLMs
* https://artificialanalysis.ai/ -> AI comparison

## Testing
* EZE testigin with playwright -> web (EZE?)
* Unit testing with Vitest and Testing Library

## MCPS
Implementation
https://github.com/upstash/context7 -> library tech documentation

## Rules of thumb:
    - most intelligent model better vs speed
	- agents.md: Spec, style, success
	- work incrementally. Test constantly, validate success criteria
    - if in trouble -> simplify
	- challenge and demand evidence
	- handle frustration with style

## Context window management
* Periodically open new session following these steps:
In the PM MVP is done before starting Part8 (Add new feature: AI Chat to working product (Kanban with DB and APIs and login)
* PROMPT: confirm that PLAN.md is upd date with all the latest, including any design decisions that you made. Let me know when ready.
ZAG: also think is Agents.md needs updating.
* save session
* validate PLAN.md
* git commit with updated PLAN.md
* create new session
* PROMPT: Read AGENTS.md, then read PLAN.md and let me know any questions before we start Part 8.
* Record in PLAN.md server start, stop and test the server effectively.
* Ask to record this kind of tasks before starting a new session


# Starting new session with Claude or Open Code:
## Initial hygiene
* run /init to check what is inside
* CREATE YOUR OWN CLAUDE.md or AGENTS.md with YOUR instructions
### Prompt READ:
* Read existing AGENTS.md and PLAN.md and docs in /docs Read PLAN:md in the docs folder to understand everythong that has been built so far and any supporting docs.
### Prompt TEST: 
* Run all tests to confirm that everything is working. Bring up the server as needed and bring it down at the end.

# Code Review
### PROMPT CODE REVIEW: 
* Carry out a comprehensive code review of the entire repo, and write a report with actions organized in priority groups to code_review.md in the docs folder 

* Check the report
* Prompt to address: Go ahead and address all the Critical, High and Medium priority issues and retest everything. Let me know when everything is remediated and tests ok.
(in the example AI did not fix the monolithic python module)
* FUP prompt: I need to remmediate the monolithic python module. Fix that now and retest. Refactor main.py and organize into modules and packages as appropriate. Check and test everything. 

* Update documentation

# RALPH LOOOP
## Claude Code
1. install official ralph loop plugin
2. use /ralph loop command -- max number of iterations
3. Good Practice: configure permissions in .json to minimize the questios for permissions in the process that can take several hours
4. .claude/settings.local.json/permissions/allow.json
### Prompt:
Over PM Kanban sample project: Please significantly improve this project. Add user management, multiple kanban boards feature for each user, and other features to build a comprehensive Project Management application, testing thuroughly as you go and mantaining strong test code coverage and good integration tests -- max iterations 10




# YOLO MODE
## command line:
* claude --dangerously-skip-permissions
## sandboxing



# Example prompts:
## Kanban with agents.md
see 
    `kanban/agents.md` 
    `pm/agents.md`
    `pm/docs/plan.md`

## Bug fix prompt:
Ie. The delete card feature is not working 
Reproduce the problem, prove you have reproduced it, find the root cause, fix it and prove you have fixed it.

ie: the drag and drop seems to only work occasionally. Most of the time, I drag a card, the next column highlihts, but when I release the card goes back to its original position. Test thoroughly, reproduce the problem, fix it and confirm it is fixed.

Sometimes the AI iterates endlessly trying to approve a test it can't see. In this case ctrl-c and manually check to see if it is working.


# Example Excersises
## PM
### Prompt
Review AGENTS.md and /docs/PLAN.md.
Let me know if you have any questions.
Do not do any implementation work yet.

## Questions:
* Comprehensive tests:
    - Minimum unit test coverage: 80% -> ojo con esto, ser más específico si no testea cosas que no son relevantes
    - Robust integration testing

## Trust but verify after each phase
* Prompt: tell me how to test this part myself
* add a separate terminal window to run tests yourself
* Prompt: Are all the succes criteria for part 2 achieved?
* In case is necessary you can update the plan to make adjustments (like adjusting the 80% test coverage)


### Part 8 - New session
* AI questions:
1. for the 2+2 integration test, do you want it fully mocked (no real HTTP) or should it hit the backend endpoint while mocking the OpenRouter client only?

2. Should the new AI endpoint be under /api/ai or /api/chat (or another naming preference)

3. Do you want OpenRouter base URL configurable (eg. via .env) or hardcoded to the standard OpenRouter API URL for now?

Answers:
1. All the way to OpenRouter, no mocking, check we can get an answer form the model.
2. /api/chat
3. hardcoded is good for now
Note these answers in PLAN.md and proceed with part 8








## Vibe - YOLO Site for a dentist
Plan, implement, and test a website for a dentist, including online booking for patients. No database for now, just local storage memory. Ask questions
Minimax M2.7 (minimax.io)


## Vibe - Personal Portfolio Digital Twin AI Chat
### Phase 1
Portfolio Website
Build a professional website running locally. 
Mi LinkedIn profile in LinkedIn.pdf. 
Make the website stunning: enterprise meets edgy. 
It should include: about me, my career journey, links to portfolio (for future)
Iterate to make it as slick and professional as possible and let me know only when completed.
Use NextJS

### Phase 2
Add ability to have an AI chat with a ‘Digital Twin’ which can answer questions about my career. Use Openrouter
Use model named “open/gpt -oss- 120b” 
Make the changes, make sure it works
Let me know when ready for me

### Phase 3 - Documentation
Write a comprehensive tutorial in markdown called tutorial.md that is suitable for a complete beginner in front-end coding, to walk me through what you have done here.
Include a summary of the technology, a high level walk through, and a detailed code review with code samples.
End with 5 suggestions for ways the code could be improved based on a self-review

### Phase 4 - review:
Do a comprehensive code review of this project and write the results to review.md including any remedial actions needed. Don’t change any code. 

Sent to OPUS 4.5 (Different agent that built it)

### Improve IU - YOLO MODE
Improve the UI of this project, particularly making sure that the horizontal layout looks better, with icons instead of delete buttons and using the horizontal space properly. Make your changes, test everything, let me know when done


# Configure Claude Code to use other models
* See EP 39 - W2 D1: AMP Code...
