CREATE TABLE temp_junk (
    cntct_crmacct_id integer,
    cntct_owner_username text,
    cntct_email text,
    cntct_id integer NOT NULL,
    cntct_addr_id integer,
    cntct_first_name text,
    cntct_last_name text,
    cntct_honorific text,
    cntct_initials text,
    cntct_active boolean,
    cntct_phone text,
    cntct_phone2 text,
    cntct_fax text,
    cntct_webaddr text,
    cntct_notes text,
    cntct_title text,
    cntct_number text NOT NULL,
    cntct_middle text,
    cntct_suffix text,
    cntct_name text,
    obj_uuid uuid,
    cntct_created timestamp with time zone,
    cntct_lastupdated timestamp with time zone
);


ALTER TABLE temp_junk OWNER TO admin;

--
-- TOC entry 12591 (class 0 OID 0)
-- Dependencies: 2421
-- Name: TABLE temp_junk; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON TABLE temp_junk IS 'For temporary storage before deleting';


--
-- TOC entry 2422 (class 1259 OID 328542818)
-- Name: temp_junk_cntct_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE temp_junk_cntct_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE temp_junk_cntct_id_seq OWNER TO admin;

--
-- TOC entry 12592 (class 0 OID 0)
-- Dependencies: 2422
-- Name: temp_junk_cntct_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE temp_junk_cntct_id_seq OWNED BY temp_junk.cntct_id;


--
-- TOC entry 11193 (class 2604 OID 328542820)
-- Name: cntct_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY temp_junk ALTER COLUMN cntct_id SET DEFAULT nextval('temp_junk_cntct_id_seq'::regclass);
