DELETE FROM users;
DELETE FROM alliances;
DELETE FROM characters;

--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.0
-- Dumped by pg_dump version 9.6.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

--
-- Data for Name: alliances; Type: TABLE DATA; Schema: public; Owner: efrei
--

COPY alliances (id, name) FROM stdin;
1	Les gentils
2	Les méchants
3	Les Suisses
\.


--
-- Name: alliances_id_seq; Type: SEQUENCE SET; Schema: public; Owner: efrei
--

SELECT pg_catalog.setval('alliances_id_seq', 4, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: efrei
--

COPY users (id, name, email, alliance_id) FROM stdin;
1	Pierrick	pierrick@test.com	1
2	Ronan	ronan@test.com	1
3	Godefroy	godefroy@test.com	1
4	Bill	bill@test.com	3
5	Notch	notch@test.com	2
6	Fish	fish@test.com	2
7	Meyer	meyer@test.com	2
8	Kojima	kojima@test.com	3
\.


--
-- Data for Name: characters; Type: TABLE DATA; Schema: public; Owner: efrei
--

COPY characters (id, name, user_id, class, "position") FROM stdin;
1	Gedeon	2	thief	(0,0)
2	Gimli	2	warrior	(0,0)
3	Pippin	2	thief	(0,0)
4	Merry	3	thief	(0,0)
5	Aragorn	4	warrior	(0,0)
6	Boromir	4	warrior	(0,0)
7	Saroumane	5	mage	(0,0)
8	Golum	6	thief	(0,0)
9	Legolas	7	thief	(0,0)
10	Sam	7	thief	(0,0)
11	Faramir	8	warrior	(0,0)
\.


--
-- Name: characters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: efrei
--

SELECT pg_catalog.setval('characters_id_seq', 12, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: efrei
--

SELECT pg_catalog.setval('users_id_seq', 9, true);


--
-- PostgreSQL database dump complete
--

