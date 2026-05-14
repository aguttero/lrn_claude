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

# Rules of thumb:
    - most intelligent model better vs speed
	- agents.md: Spec, style, success
	- work incrementally. Test constantly, validate success criteria
    - if in trouble -> simplify
	- challenge and demand evidence
	- handle frustration with style



# Example prompts:
## Kanban with agents.md
see 
    `kanban/agents.md` 
    `pm/agents.md`
    `pm/docs/plan.md`

## Bug fix prompt:
Ie. The delete card feature is not working 
Reproduce the problem, prove you have reproduced it, find the root cause, fix it and prove you have fixed it.


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




## Vibe - YOLO Site for a dentist
Plan, implement, and test a website for a dentist, including online booking for patients. No database for now, just local storage memory. Ask questions
Minimax M2.7 (minimax.io)


## Vibe - Personal Portfolio Digital Twin AI Chat
Phase 1
Portfolio Website
Build a professional website running locally. 
Mi LinkedIn profile in LinkedIn.pdf. 
Make the website stunning: enterprise meets edgy. 
It should include: about me, my career journey, links to portfolio (for future)
Iterate to make it as slick and professional as possible and let me know only when completed.
Use NextJS

Phase 2
Add ability to have an AI chat with a ‘Digital Twin’ which can answer questions about my career. Use Openrouter
Use model named “open/gpt -oss- 120b” 
Make the changes, make sure it works
Let me know when ready for me

Phase 3 - Documentation
Write a comprehensive tutorial in markdown called tutorial.md that is suitable for a complete beginner in front-end coding, to walk me through what you have done here.
Include a summary of the technology, a high level walk through, and a detailed code review with code samples.
End with 5 suggestions for ways the code could be improved based on a self-review

Phase 4 - review:
Do a comprehensive code review of this project and write the results to review.md including any remedial actions needed. Don’t change any code. 

Sent to OPUS 4.5 (Different agent that built it)
