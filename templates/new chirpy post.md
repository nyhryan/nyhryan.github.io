<%*
const title = await tp.system.prompt("Enter title: ", "TITLE");
const now = tp.date.now("YYYY-MM-DD");

const full_title = `${now}-${title}`;
await tp.file.rename(full_title);
-%>
---
title: <%* tR += title %>
description: 
date: <% tp.file.creation_date("YYYY-MM-DD HH:MM:SS ZZ") %>
categories: []
tags: []
---

# <%* tR += title %>

