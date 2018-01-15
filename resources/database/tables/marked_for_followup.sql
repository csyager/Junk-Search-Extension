CREATE TABLE marked_for_followup (
    cntct_id integer DEFAULT nextval('cntct_cntct_id_seq'::regclass) NOT NULL,
    cntct_crmacct_id integer,
    cntct_addr_id integer,
    cntct_first_name text,
    cntct_last_name text,
    cntct_honorific text,
    cntct_initials text,
    cntct_active boolean DEFAULT true,
    cntct_phone text,
    cntct_phone2 text,
    cntct_fax text,
    cntct_email text,
    cntct_webaddr text,
    cntct_notes text,
    cntct_title text,
    cntct_number text NOT NULL,
    cntct_middle text,
    cntct_suffix text,
    cntct_owner_username text,
    cntct_name text,
    obj_uuid uuid DEFAULT xt.uuid_generate_v4(),
    cntct_created timestamp with time zone,
    cntct_lastupdated timestamp with time zone
);


ALTER TABLE marked_for_followup OWNER TO admin;

--
-- TOC entry 12602 (class 0 OID 0)
-- Dependencies: 2420
-- Name: TABLE marked_for_followup; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON TABLE marked_for_followup IS 'Contains contacts that are possible duplicates, may require further review';


--
-- TOC entry 11200 (class 2606 OID 70331588)
-- Name: marked_for_followup_cntct_number_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY marked_for_followup
    ADD CONSTRAINT marked_for_followup_cntct_number_key UNIQUE (cntct_number);


--
-- TOC entry 11202 (class 2606 OID 70331590)
-- Name: marked_for_followup_obj_uuid_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY marked_for_followup
    ADD CONSTRAINT marked_for_followup_obj_uuid_key UNIQUE (obj_uuid);


--
-- TOC entry 11204 (class 2606 OID 70331586)
-- Name: marked_for_followup_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY marked_for_followup
    ADD CONSTRAINT marked_for_followup_pkey PRIMARY KEY (cntct_id);


--
-- TOC entry 11196 (class 1259 OID 70331592)
-- Name: marked_for_followup_cntct_crmacct_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX marked_for_followup_cntct_crmacct_id_idx ON marked_for_followup USING hash (cntct_crmacct_id);


--
-- TOC entry 11197 (class 1259 OID 70331591)
-- Name: marked_for_followup_cntct_email_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX marked_for_followup_cntct_email_idx ON marked_for_followup USING btree (cntct_email);


--
-- TOC entry 11198 (class 1259 OID 70331593)
-- Name: marked_for_followup_cntct_name_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX marked_for_followup_cntct_name_idx ON marked_for_followup USING btree (cntct_name);

